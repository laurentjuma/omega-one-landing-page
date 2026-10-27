/**
 * Pulls the published content into the repo, ready for a static build.
 *
 * The site is exported as static files for GitHub Pages, so there is no server left to fetch the
 * app's content on a request or to resize an image on the fly. This script does both at build time:
 *
 *   1. reads the About half of the app's published `app_content.json`,
 *   2. reads the newest mixes from the app's mixes feed,
 *   3. downloads every image, resizes it to the sizes the page actually uses, and writes WebP into
 *      `public/media/`,
 *   4. lists every mix, for the page a shared mix's link opens (`/listen/mix/<id>/`): its title and cover
 *      in the link's preview,
 *   5. writes `src/content/site-content.generated.json`, which is what the page imports.
 *
 * The generated file and the media are committed, so `npm run build` works on a fresh clone with no
 * network. Run `npm run sync` (CI does, on a schedule) to pick up new copy, photography or mixes.
 *
 * Usage: node scripts/sync-content.mjs
 */

import { createHash } from "node:crypto";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const CONTENT_URL =
  "https://raw.githubusercontent.com/c4Entertainment/omega-one-newsfeed/main/content/app_content.json";
const MIXES_URL = "https://api-v2.hearthis.at/omega-one-sounds-nt/?type=tracks&page=1&count=2";
const MIX_COUNT = 2;
/** Every mix, a page at a time, for the shared mixes' pages. */
const ALL_MIXES_URL = (page) =>
  `https://api-v2.hearthis.at/omega-one-sounds-nt/?type=tracks&page=${page}&count=${ALL_MIXES_PAGE}`;
const ALL_MIXES_PAGE = 100;

const MEDIA_DIR = join(process.cwd(), "public", "media");
const OUT_FILE = join(process.cwd(), "src", "content", "site-content.generated.json");

/** What the page renders each kind of image at, times two for retina. */
const SIZES = {
  /** Gallery cards, ~288px wide. */
  card: 800,
  /** The viewer, which fills the window. */
  full: 1600,
  /** Mix artwork, 96px square. */
  thumb: 256,
};

const written = new Set();

async function fetchJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${url} answered ${response.status}`);
  return response.json();
}

/**
 * Downloads [url], writes it at each width in [widths], and returns the descriptors.
 *
 * The name is the source's own file name plus a short digest of the URL: the content repo names files
 * by timestamp, so this stays stable between runs and changes when the photograph does.
 */
async function localiseImage(url, widths) {
  if (!url) return null;

  const response = await fetch(url, { headers: { accept: "image/*,*/*" } });
  if (!response.ok) throw new Error(`${url} answered ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());

  const stem = (url.split("/").pop() ?? "image").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48);
  const digest = createHash("sha1").update(url).digest("hex").slice(0, 8);

  const variants = {};
  for (const [role, width] of Object.entries(widths)) {
    const name = `${stem}-${digest}-${width}.webp`;
    const image = sharp(source).rotate().resize({ width, withoutEnlargement: true });
    const { data, info } = await image.webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
    await writeFile(join(MEDIA_DIR, name), data);
    written.add(name);
    variants[role] = { src: `/media/${name}`, width: info.width, height: info.height };
  }
  return variants;
}

/** Shots keep two sizes: the rail card, and the one the viewer opens. */
async function localiseShot(shot) {
  const variants = await localiseImage(shot.image, { card: SIZES.card, full: SIZES.full });
  return {
    index: shot.index ?? "",
    caption: shot.caption ?? "",
    description: shot.description ?? "",
    image: variants ? { ...variants.card, large: variants.full.src } : null,
  };
}

async function localiseGallery(gallery) {
  if (!gallery) return { title: "", note: "", shots: [] };
  return {
    title: gallery.title ?? "",
    note: gallery.note ?? "",
    shots: await Promise.all((gallery.shots ?? []).map(localiseShot)),
  };
}

async function buildAbout() {
  const published = await fetchJson(CONTENT_URL);
  const about = published.about;
  if (!about) throw new Error("the published content has no `about` section");

  const hero = await localiseImage(about.hero?.image, { full: SIZES.full });

  // `_meta` carries the editorial notes the app does not read; it stays out of the bundle.
  const rest = { ...about };
  delete rest._meta;

  return {
    ...rest,
    hero: { ...about.hero, image: hero?.full ?? null },
    room: await localiseGallery(about.room),
    legends: await localiseGallery(about.legends),
  };
}

async function buildMixes() {
  const tracks = await fetchJson(MIXES_URL);
  if (!Array.isArray(tracks)) throw new Error("the mixes feed did not answer with a list");

  return Promise.all(
    tracks.slice(0, MIX_COUNT).map(async (track) => ({
      id: String(track.id),
      title: track.title ?? "",
      description: track.description ?? "",
      durationSeconds: Number(track.duration) || 0,
      releasedAt: (Number(track.release_timestamp) || 0) * 1000,
      previewUrl: track.preview_url ?? "",
      plays: Number(track.counts?.plays) || 0,
      artwork: (await localiseImage(track.artwork_url, { thumb: SIZES.thumb }))?.thumb ?? null,
    })),
  );
}

/**
 * Every mix, for the page each shared link opens. The cover stays on hearthis: only WhatsApp and the like
 * fetch it, for the link's preview, so there's nothing to resize.
 */
async function buildSharedMixes() {
  const mixes = [];
  // hearthis counts pages from 1; a short page is the last
  for (let page = 1; ; page++) {
    const tracks = await fetchJson(ALL_MIXES_URL(page));
    if (!Array.isArray(tracks)) throw new Error("the mixes feed did not answer with a list");
    for (const track of tracks) {
      mixes.push({
        id: String(track.id),
        title: track.title ?? "",
        description: track.description ?? "",
        durationSeconds: Number(track.duration) || 0,
        plays: Number(track.playback_count) || 0,
        artworkUrl: track.artwork_url ?? "",
      });
    }
    if (tracks.length < ALL_MIXES_PAGE) return mixes;
  }
}

/** Drops media from an earlier run that nothing points at any more. */
async function pruneMedia() {
  const existing = await readdir(MEDIA_DIR);
  const stale = existing.filter((name) => name !== ".gitkeep" && !written.has(name));
  await Promise.all(stale.map((name) => rm(join(MEDIA_DIR, name))));
  return stale.length;
}

async function main() {
  await mkdir(MEDIA_DIR, { recursive: true });

  const [about, mixes, sharedMixes] = await Promise.all([buildAbout(), buildMixes(), buildSharedMixes()]);
  const pruned = await pruneMedia();

  const payload = {
    syncedAt: new Date().toISOString(),
    about,
    mixes,
    sharedMixes,
  };
  await writeFile(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`);

  const shots = about.room.shots.length + about.legends.shots.length;
  console.log(
    `synced: ${shots} shots, ${mixes.length} mixes (${sharedMixes.length} shareable), ${written.size} media files written` +
      (pruned ? `, ${pruned} stale removed` : ""),
  );
}

await main();

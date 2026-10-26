# Omega One Sounds — landing page

The web shopfront for the [Omega One Sounds Android app](https://play.google.com/store/apps/details?id=com.soundcheck.omegaone).

It is the app's **About Us** screen, rebuilt for the web: the same copy, the same photography and the
same editorial voice, with the two newest mixes and the download in the middle of it. Everything on
the page leads to one action — installing the app.

Live at **https://laurentjuma.github.io/omega-one-landing-page/**

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components, Turbopack) |
| Language | TypeScript, strict |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no config file) |
| Content | Zod v4 over a build-time sync; `sharp` cuts the images |
| Output | `next build` → a static export, served by GitHub Pages |
| Type | Figtree via `next/font` — the closest web stand-in for the app's Circular |

No UI kit and no animation library: a handful of server components with three client islands (the top
bar's scroll fade, the gallery viewer, the mix player).

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run sync    # pull the app's published content and cut the images
npm run build   # static export into out/
npm run lint
```

Node 20.9+ (22 or newer preferred). `npm run build` needs no network: the synced content is committed.

## Where the content comes from

Nothing on the page is hard-coded copy, and nothing is fetched at runtime — the site is static, so
`scripts/sync-content.mjs` pulls everything in at build time:

| Source | Used for |
| --- | --- |
| `content/app_content.json` in [`omega-one-newsfeed`](https://github.com/c4Entertainment/omega-one-newsfeed) | Hero, story, stats, galleries, services, contact, colophon |
| The app's mixes feed | The two newest mixes and their previews |

The sync downloads every photograph, resizes it to the sizes the page actually renders (800px for
gallery cards, 1600px for the viewer, 256px for mix artwork), writes WebP into `public/media/`, and
writes `src/content/site-content.generated.json` — which `src/lib/content.ts` validates and the page
imports. Both the JSON and the media are committed, so a clone builds offline and a deploy is
reproducible.

New About copy or a new mix therefore reaches the site on the next sync + build. CI does that daily,
so publishing in the app is enough; nobody has to touch this repo.

Only the mix previews still stream from where the app's audio is hosted. They are previews on purpose:
the full sets are in the app, which is the argument the download sections make.

## The web player

The app also runs in the browser (`:webApp` in [omega-one-sounds](https://github.com/laurentjuma/omega-one-sounds)), so a
visitor without Android can hear a whole mix instead of the preview. Its build lives in `public/listen/` and ships with
the page: **https://laurentjuma.github.io/omega-one-landing-page/listen/**.

- **Don't edit `public/listen/` by hand.** It's the app's production build, replaced whole by omega-one-sounds' *Publish
  web* workflow (`.github/workflows/web.yml` there), which commits it here; that push deploys the site as any other.
- `listen/?mix=<id>`, with the mix's `id` from `site-content.generated.json` (its hearthis track id), opens the player
  with that mix cued. It needs one tap to play: a page opened from a link can't start sound by itself.
- The player needs a recent browser (Chrome and Edge 119, Firefox 120, Safari 18.2). An older one gets a page linking
  back to `../#mixes` and the Play Store, so the previews here stay the way in for everyone.
- It is about 12 MB gzipped on a first visit, so link to it rather than embedding it in the page.
- It shares this origin's storage. It doesn't read `omega-theme` yet.

Not done yet: the mix cards' "Play the full mix" and a Listen link in the header.

## Theming

The page carries the app's idea of a theme — a palette the reader picks — rather than a single look.
The switcher sits in the header and the footer:

| Theme | | |
| --- | --- | --- |
| **Light** (default) | Green on near-white | accent `#0B6B53` |
| **Dark** | The same green over a teal-black ground | accent `#34D6A3` |
| **Auto** | Light or Dark, whichever the device asks for | |
| **Omega** | The app's own dark scheme, kept as an alternative | `#16053D` under `#FF3C8F` |

The green is the mark's own teal (`#16474E`, sampled from the launcher icon) brought to a lightness
that reads on each ground; both accents clear WCAG AA against their background and as button fills.

How it hangs together:

- `src/app/globals.css` declares one token set (`--bg`, `--surface`, `--fg`, `--muted`, `--subtle`,
  `--line`, `--accent`, `--accent-fg`, `--live`, `--pulse`, `--glow`, `--logo`) and one block of
  values per theme. `@theme inline` maps them onto utilities — `bg-bg`, `text-muted`, `border-line`,
  `text-accent` — so components never name a colour and a fifth palette is just another block.
- `src/lib/theme.ts` holds the choices and the tiny script that stamps `data-theme` on `<html>`
  before first paint, so a chosen theme never flashes the default one.
- `src/components/theme-switcher.tsx` reads the stored choice through `useSyncExternalStore`, which
  keeps the server render honest and two open tabs in step.
- The mark ships in two versions (light-on-dark, dark-on-light). `--logo` picks one as a CSS
  background, so the browser downloads only the variant the current theme uses.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`, on
demand, and daily at 04:20 UTC (07:20 in Kisumu) to pick up new content. The workflow takes the base
path and origin from `actions/configure-pages`, so the URLs are right for wherever Pages serves it.

Two settings matter if the address changes:

- `NEXT_PUBLIC_BASE_PATH` — the sub-path the site is served from. Empty for a custom domain or a
  user-page repo; CI fills it in for a project page.
- `NEXT_PUBLIC_SITE_URL` — the canonical origin, used by the canonical tag, Open Graph,
  `robots.txt` and `sitemap.xml`. Defaults to the Pages address in `src/lib/config.ts`.

For a custom domain (`omegaonesounds.com`), add the domain in the repo's Pages settings, commit a
`public/CNAME` holding it, and leave `NEXT_PUBLIC_BASE_PATH` empty.

## Keeping it in step with the app

`src/lib/config.ts` mirrors the app's `Config.kt` for the store listing; the `display` / `label`
utilities stand in for `editorialDisplayStyle` and `editorialLabelStyle`; and the section furniture
follows `AboutSections.kt` — a hairline rule, the title with its wide-tracked note, the elevated
surface cards, the snap-scrolling rails. Change the store listing or the app's palette and change it
here too.

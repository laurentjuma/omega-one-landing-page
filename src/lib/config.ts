/**
 * Single source of truth for the things the landing page points at.
 *
 * The store listing mirrors the app's `Config.kt`. The feeds the content comes from live in
 * `scripts/sync-content.mjs`, which is the only thing that talks to them.
 */

const PLAY_STORE_ID = "com.soundcheck.omegaone";

export const siteConfig = {
  name: "Omega One Sounds",
  shortName: "Omega One",
  since: 1983,
  /**
   * Where the site is served from. CI sets `NEXT_PUBLIC_SITE_URL` from GitHub Pages; the default is
   * the custom domain, omegaonesounds.com. It drives the canonical tag, the Open Graph URLs,
   * `robots.txt` and `sitemap.xml`.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://omegaonesounds.com",
  description:
    "Omega One Sounds — Kisumu, Kenya, since 1983. Live sound, mobile disco and four decades of mixes. Hear the latest, then get the app.",

  playStore: {
    id: PLAY_STORE_ID,
    url: `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}`,
  },
} as const;

/** What the app gives you that a web page cannot — the copy for the download sections. */
export const appPerks = [
  {
    icon: "album",
    title: "Every mix, full length",
    text: "Four decades of sets in one library, not the 90-second preview.",
  },
  {
    icon: "download",
    title: "Download and go offline",
    text: "Keep mixes on the phone for the matatu, the shamba, the road.",
  },
  {
    icon: "campaign",
    title: "Where we are playing",
    text: "The events feed, straight from Kisumu as the dates are set.",
  },
  {
    icon: "bolt",
    title: "Background play",
    text: "Lock the screen and the sound keeps running.",
  },
] as const;

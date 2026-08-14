import type { NextConfig } from "next";

/**
 * The site ships as static files to GitHub Pages, which serves them from a sub-path
 * (`/omega-one-landing-page/`) and cannot run a server. So: `output: "export"`, no image optimiser —
 * `scripts/sync-content.mjs` cuts the sizes at build time instead — and a base path taken from the
 * environment, which keeps `npm run dev` at the root.
 *
 * `NEXT_PUBLIC_BASE_PATH` is also read by `src/lib/asset.ts`, for the URLs Next cannot rewrite for
 * us: media in `public/`, and the logo variants named from CSS.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  // Pages resolves `/about` to `/about/index.html`, so keep the trailing slash.
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;

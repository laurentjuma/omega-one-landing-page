/**
 * Prefixes a path in `public/` with the deployment's base path.
 *
 * GitHub Pages serves the site from `/omega-one-landing-page/`, so every URL the page writes itself
 * — media, the logo variants in CSS — needs the prefix. Next rewrites `next/font` and bundle URLs on
 * its own; these are the ones it cannot see.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

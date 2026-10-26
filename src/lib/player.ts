import { asset } from "@/lib/asset";

/**
 * The web player's address: the app's browser build, served beside the page from `public/listen/`. With a mix's id
 * (its hearthis track id) the player opens with that mix cued; a page opened from a link can't start sound by itself,
 * so it waits for one tap.
 */
export function playerHref(mixId?: string): string {
  const player = asset("/listen/");
  return mixId ? `${player}?mix=${encodeURIComponent(mixId)}` : player;
}

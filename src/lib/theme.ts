/**
 * Theme choices, after the app's `ColorPalettePreference` and `DarkModePreference`. Light is the
 * default; `system` follows the device; `omega` is the app's own palette. The palettes themselves
 * live in `globals.css`.
 */

export const THEMES = ["light", "dark", "system", "omega"] as const;

export type Theme = (typeof THEMES)[number];

/** No `data-theme` attribute means this one — see the `:root` block in `globals.css`. */
export const DEFAULT_THEME: Theme = "light";

/** Read by the inline script in the document head as well as by the switcher. */
export const THEME_STORAGE_KEY = "omega-theme";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

/**
 * Runs before first paint so the chosen theme is on `<html>` before anything is painted — without
 * it, a reader who picked dark would get a light flash on every load. Kept as a string because it
 * has to be inlined.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t&&t!==${JSON.stringify(DEFAULT_THEME)}&&${JSON.stringify(
  THEMES as readonly string[],
)}.indexOf(t)>-1){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`;

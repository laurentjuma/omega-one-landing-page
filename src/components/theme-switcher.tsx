"use client";

import { useSyncExternalStore } from "react";

import { DEFAULT_THEME, isTheme, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/**
 * The palette picker — the web's share of the app's theme settings.
 *
 * `system` leaves `data-theme` off so the stylesheet's `prefers-color-scheme` block decides; the rest
 * stamp the attribute. The choice lives in `localStorage`, which is external state, so it is read
 * through [useSyncExternalStore]: the server snapshot is `null` (nothing marked active, since the
 * server cannot know), and the real value arrives on hydration without a mismatch. Subscribing also
 * keeps two open tabs in step.
 */

const OPTIONS: ReadonlyArray<{ theme: Theme; label: string; title: string }> = [
  { theme: "system", label: "Auto", title: "Follow the device" },
  { theme: "light", label: "Light", title: "Light" },
  { theme: "dark", label: "Dark", title: "Dark" },
  { theme: "omega", label: "Omega", title: "The app's own palette" },
];

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Fires for writes from another tab; `listeners` covers this one.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function getServerSnapshot(): Theme | null {
  return null;
}

function choose(theme: Theme) {
  const root = document.documentElement;
  if (theme === DEFAULT_THEME) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing can refuse writes; the choice still holds for this page.
  }
  listeners.forEach((listener) => listener());
}

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={`inline-flex items-center gap-0.5 rounded-full p-1 ring-1 ring-inset ring-line ${className}`}
    >
      {OPTIONS.map((option) => {
        const active = theme === option.theme;
        return (
          <button
            key={option.theme}
            type="button"
            onClick={() => choose(option.theme)}
            title={option.title}
            aria-pressed={active}
            className={`label rounded-full px-2.5 py-1.5 transition-colors ${
              active ? "bg-accent-soft text-accent" : "text-subtle hover:text-fg"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

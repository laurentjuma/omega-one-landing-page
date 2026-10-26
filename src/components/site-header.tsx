"use client";

import { useEffect, useState } from "react";

import { PlayStoreButton } from "@/components/play-store-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/lib/config";
import { playerHref } from "@/lib/player";

/**
 * The top bar, transparent over the hero and fading to opaque as you scroll — the web reading of
 * `AppTopBar`'s `collapsedProgress`, over the same 400px.
 */

const COLLAPSE_DISTANCE = 400;

const NAV = [
  { label: "Mixes", href: "#mixes" },
  { label: "Story", href: "#story" },
  { label: "The room", href: "#room" },
  { label: "What we do", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [collapsed, setCollapsed] = useState(0);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const progress = Math.min(1, Math.max(0, window.scrollY / COLLAPSE_DISTANCE));
        // Snapped to twentieths: enough steps to read as a fade, few enough to keep renders rare.
        setCollapsed(Math.round(progress * 20) / 20);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="absolute inset-0 -z-10 border-b border-line bg-bg/85 backdrop-blur-xl"
        style={{ opacity: collapsed }}
        aria-hidden="true"
      />
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="label whitespace-nowrap">
          <span className="hidden sm:inline">{siteConfig.name}</span>
          <span className="sm:hidden">{siteConfig.shortName}</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label text-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {/* Hidden on the narrowest screens, where the footer's copy carries it instead. On a wrapper: the switcher's
              own inline-flex beat a `hidden` passed to it, and on a phone it pushed Listen and Get the app off-screen. */}
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>
          {/* The whole library in the browser, for anyone without Android; a link out, as the player is a page of its own */}
          <a
            href={playerHref()}
            className="label rounded-full border border-line-strong px-4 py-2.5 transition-colors hover:border-accent hover:text-accent"
          >
            Listen
          </a>
          <PlayStoreButton size="sm" label="Get the app" kicker="" />
        </div>
      </div>
    </header>
  );
}

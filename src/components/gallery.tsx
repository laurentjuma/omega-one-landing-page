"use client";

import { useCallback, useEffect, useState } from "react";

import { PageImage } from "@/components/page-image";
import type { AboutGallery, AboutShot } from "@/lib/content";

/**
 * A gallery rail — `GalleryRail` on the About screen. The rail is padded rather than the section, so
 * the last shot bleeds past the gutter and reads as swipeable without an affordance.
 *
 * Shots with artwork open the viewer, which pages through the rail with the arrow keys, mirroring
 * `AboutImageViewer`.
 */
export function Gallery({
  gallery,
  note,
  noteHref,
  id,
}: {
  gallery: AboutGallery;
  note?: string;
  noteHref?: string;
  id?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shots = gallery.shots;

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + delta + shots.length) % shots.length;
      });
    },
    [shots.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    // Stop the page scrolling behind the viewer.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, step]);

  if (shots.length === 0) return null;

  return (
    <section id={id} className="border-t border-line py-14 sm:py-20">
      <div className="shell flex items-end justify-between gap-4">
        <h2 className="display text-[clamp(1.5rem,4vw,2.25rem)]">{gallery.title}</h2>
        {note ? (
          noteHref ? (
            <a href={noteHref} className="label shrink-0 text-accent hover:text-fg">
              {note}
            </a>
          ) : (
            <p className="label shrink-0 text-muted">{note}</p>
          )
        ) : null}
      </div>

      <ul className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter [scroll-padding-left:var(--spacing-gutter)]">
        {shots.map((shot, index) => (
          <li key={`${shot.index}-${shot.caption}`} className="w-60 shrink-0 snap-start sm:w-72">
            <Shot shot={shot} onOpen={() => setOpenIndex(index)} />
          </li>
        ))}
      </ul>

      {openIndex !== null ? (
        <Viewer
          shots={shots}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onStep={step}
        />
      ) : null}
    </section>
  );
}

function Shot({ shot, onOpen }: { shot: AboutShot; onOpen: () => void }) {
  const frame = (
    <div className="aspect-[232/168] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-accent/50 to-surface">
      {shot.image ? (
        <PageImage
          image={shot.image}
          alt={shot.caption}
          sizes="(max-width: 640px) 60vw, 288px"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
    </div>
  );

  return (
    <div className="group">
      {shot.image ? (
        <button type="button" onClick={onOpen} className="block w-full text-left">
          {frame}
        </button>
      ) : (
        frame
      )}
      <div className="mt-3 flex items-center gap-3">
        <span className="label tnum text-accent">{shot.index}</span>
        <span className="label truncate text-subtle">{shot.caption}</span>
      </div>
    </div>
  );
}

function Viewer({
  shots,
  index,
  onClose,
  onStep,
}: {
  shots: AboutShot[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const shot = shots[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.caption}
      className="fixed inset-0 z-[60] flex flex-col bg-bg-deep/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-4 px-gutter py-4">
        <p className="label tnum text-subtle">
          {shot.index} / {String(shots.length).padStart(2, "0")}
        </p>
        <button type="button" onClick={onClose} className="label text-muted hover:text-fg">
          Close ✕
        </button>
      </div>

      <button
        type="button"
        aria-label="Close the viewer"
        onClick={onClose}
        className="flex min-h-0 flex-1 cursor-zoom-out items-center justify-center p-4"
      >
        {shot.image ? (
          <PageImage
            image={shot.image}
            alt={shot.caption}
            large
            loading="eager"
            sizes="100vw"
            className="max-h-full w-auto max-w-full object-contain"
          />
        ) : null}
      </button>

      <div className="px-gutter pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="display text-lg sm:text-2xl">{shot.caption}</h3>
          {shot.description ? (
            <p className="mt-3 text-sm text-muted">{shot.description}</p>
          ) : null}
        </div>

        {shots.length > 1 ? (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onStep(-1)}
              className="label rounded-full px-5 py-2.5 ring-1 ring-inset ring-line-strong hover:bg-fg/10"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              className="label rounded-full px-5 py-2.5 ring-1 ring-inset ring-line-strong hover:bg-fg/10"
            >
              Next →
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

/**
 * The section furniture from the About screen: a hairline rule, then a padded block with its title
 * on the left and a wide-tracked note on the right.
 */

export function Section({
  id,
  children,
  className = "",
  bleed = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Rails pad their own contents so the last card can bleed past the gutter. */
  bleed?: boolean;
}) {
  return (
    <section id={id} className={`border-t border-line ${className}`}>
      <div className={bleed ? "" : "shell py-14 sm:py-20"}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  note,
  noteHref,
}: {
  title: string;
  note?: string;
  /** Turns the note into the section's action, in the accent colour, as the app does for the archive. */
  noteHref?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="display text-[clamp(1.5rem,4vw,2.25rem)]">{title}</h2>
      {note ? (
        noteHref ? (
          <a
            href={noteHref}
            className="label shrink-0 text-accent transition-colors hover:text-fg"
          >
            {note}
          </a>
        ) : (
          <p className="label shrink-0 text-muted">{note}</p>
        )
      ) : null}
    </div>
  );
}

/** `AboutCardSurface`: the elevated surface, at the app's medium corner radius. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-surface ring-1 ring-line ${className}`}>{children}</div>
  );
}

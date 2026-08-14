import { ArrowUpRightIcon, HeadphonesIcon } from "@/components/icons";
import { MixPlayer } from "@/components/mix-player";
import { PlayStoreButton } from "@/components/play-store-button";
import { PageImage } from "@/components/page-image";
import { Card, Section, SectionHeader } from "@/components/section";
import { siteConfig } from "@/lib/config";
import type { Mix } from "@/lib/content";
import { formatCount, formatDate, formatDuration } from "@/lib/format";

/** The two newest mixes off the hearthis feed, each previewable in place. */
export function Mixes({ mixes }: { mixes: Mix[] }) {
  return (
    <Section id="mixes">
      <SectionHeader title="Latest mixes" note="Two newest" />

      <p className="mt-6 max-w-2xl text-muted">
        Fresh off the decks in Kisumu. Press play for a preview — the full sets, hours of them, are in
        the app.
      </p>

      {mixes.length > 0 ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {mixes.map((mix, index) => (
            <MixCard key={mix.id} mix={mix} index={index} />
          ))}
        </div>
      ) : (
        <Card className="mt-10 flex flex-wrap items-center gap-6 p-8">
          <p className="text-muted">
            The mixes feed is not answering right now — the whole library is in the app.
          </p>
          <PlayStoreButton size="md" />
        </Card>
      )}
    </Section>
  );
}

function MixCard({ mix, index }: { mix: Mix; index: number }) {
  const meta = [
    formatDate(mix.releasedAt),
    formatDuration(mix.durationSeconds),
    mix.plays > 0 ? `${formatCount(mix.plays)} plays` : "",
  ].filter(Boolean);

  return (
    <Card className="flex flex-col p-6 sm:p-8">
      <div className="flex items-start gap-5">
        <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-surface-raised sm:size-24">
          {mix.artwork ? (
            <PageImage
              image={mix.artwork}
              alt={`Artwork for ${mix.title}`}
              loading="eager"
              sizes="96px"
              className="size-full object-cover"
            />
          ) : (
            <HeadphonesIcon className="size-8 text-subtle" />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="label tnum text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            {index === 0 ? (
              <span className="label rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                Newest
              </span>
            ) : null}
          </div>
          <h3 className="display mt-3 text-[clamp(1.25rem,2.4vw,1.75rem)]">{mix.title}</h3>
          {mix.description ? (
            <p className="mt-2 text-sm text-muted">{mix.description}</p>
          ) : null}
        </div>
      </div>

      <p className="label tnum mt-6 text-subtle">{meta.join(" · ")}</p>

      {mix.previewUrl ? <MixPlayer src={mix.previewUrl} title={mix.title} /> : null}

      <div className="mt-7 border-t border-line pt-6">
        <a
          href={siteConfig.playStore.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.08em] text-accent underline-offset-4 hover:underline"
        >
          Full mix in the app
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      </div>
    </Card>
  );
}

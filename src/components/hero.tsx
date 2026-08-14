import { ArrowDownIcon } from "@/components/icons";
import { OmegaMark } from "@/components/omega-mark";
import { PageImage } from "@/components/page-image";
import { PlayStoreButton } from "@/components/play-store-button";
import { siteConfig } from "@/lib/config";
import type { AboutContent } from "@/lib/content";

/**
 * The hero, built from the About screen's: eyebrow, a two-line display title whose second line takes
 * the accent, then the subtitle. The download is the primary action here — everything below it is the
 * argument for pressing it.
 */
export function Hero({ hero }: { hero: AboutContent["hero"] }) {
  return (
    <div className="relative isolate overflow-hidden">
      {hero.image ? (
        <PageImage
          image={hero.image}
          alt=""
          loading="eager"
          sizes="100vw"
          className="absolute inset-0 -z-20 size-full object-cover opacity-40"
        />
      ) : null}

      {/* The app scrims its hero into the background colour; same idea, plus an accent bloom. */}
      <div aria-hidden="true" className="bloom-hero absolute inset-0 -z-10" />

      <div className="shell grid items-center gap-10 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="animate-rise">
          <div className="flex items-center gap-3">
            <p className="label whitespace-nowrap text-accent">{hero.eyebrow}</p>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent"
            />
          </div>

          <h1 className="display mt-6 text-[clamp(2.5rem,7vw,4.25rem)]">
            {hero.title}
            <span className="block text-accent">{hero.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base/relaxed text-muted sm:text-lg/relaxed">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <PlayStoreButton size="lg" />
            <a
              href="#mixes"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-black uppercase tracking-[0.08em] ring-1 ring-inset ring-line-strong transition-colors hover:bg-fg/10"
            >
              Hear the latest mixes
              <ArrowDownIcon className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          <p className="label mt-6 text-subtle">
            Free on Android · Full mixes · Offline downloads
          </p>
        </div>

        <OmegaMark
          label={`${siteConfig.name} — since 1983`}
          className="mx-auto w-full max-w-md lg:max-w-none"
        />
      </div>
    </div>
  );
}

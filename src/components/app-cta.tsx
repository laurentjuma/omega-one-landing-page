import { ContentIcon } from "@/components/icons";
import { OmegaMark } from "@/components/omega-mark";
import { PlayStoreButton } from "@/components/play-store-button";
import { appPerks } from "@/lib/config";

/**
 * The download band that sits directly under the two mixes: the previews above are the argument, and
 * this is where it is closed. Deliberately the loudest thing on the page after the hero.
 */
export function AppCta() {
  return (
    <section
      id="app"
      className="relative isolate overflow-hidden border-y border-accent/20 bg-bg-deep"
    >
      <div aria-hidden="true" className="bloom-cta absolute inset-0 -z-10" />
      {/* The mark as a watermark in the corner. Positioned by a wrapper: OmegaMark's own root is
          `relative`, so handing it `absolute` would be a coin toss on which utility wins. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -bottom-24 -z-10 hidden w-[30rem] opacity-[0.09] lg:block"
      >
        <OmegaMark />
      </div>

      <div className="shell py-16 sm:py-24">
        <p className="label text-accent">The full mixperience</p>

        <h2 className="display mt-5 max-w-3xl text-[clamp(2rem,6vw,3.75rem)]">
          Download the app for the full mixperience
        </h2>

        <p className="mt-6 max-w-2xl text-base/relaxed text-muted sm:text-lg/relaxed">
          Previews are a taste. The app is the whole sound system: four decades of mixes at full
          length, downloadable for the road, and the events feed from Kisumu as the dates land.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <PlayStoreButton size="lg" />
          <p className="label text-subtle">Free · Android</p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {appPerks.map((perk) => (
            <li key={perk.title} className="border-t border-line-strong pt-5">
              <ContentIcon name={perk.icon} className="size-5 text-accent" />
              <h3 className="mt-4 font-black uppercase tracking-[0.02em]">{perk.title}</h3>
              <p className="mt-2 text-sm text-muted">{perk.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

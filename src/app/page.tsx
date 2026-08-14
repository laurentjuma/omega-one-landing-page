import { AppCta } from "@/components/app-cta";
import { Contact } from "@/components/contact";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Mixes } from "@/components/mixes";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Stats } from "@/components/stats";
import { Story } from "@/components/story";
import { siteContent } from "@/lib/content";

/**
 * The landing page, built from the app's About Us screen: the same copy, the same photography, the
 * same order of argument — with the two newest mixes and the download in the middle of it.
 *
 * Content is baked in at build time by `npm run sync`; see `src/lib/content.ts`.
 */
export default function HomePage() {
  const { about, mixes } = siteContent;

  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero hero={about.hero} />
        <Stats stats={about.stats} />
        <Story story={about.story} />

        {/* The mixes, then the download they lead to — the two halves of one pitch. */}
        <Mixes mixes={mixes} />
        <AppCta />

        <Gallery id="room" gallery={about.room} note={about.room.note} />
        <Gallery id="legends" gallery={about.legends} note={about.legends.note} />

        <Services services={about.services} />
        <Contact contact={about.contact} links={about.links} />
      </main>
      <SiteFooter colophon={about.colophon} />
    </>
  );
}

import type { Metadata } from "next";

import { siteConfig } from "@/lib/config";
import { siteContent } from "@/lib/content";
import { formatCount, formatDuration } from "@/lib/format";
import { playerHref } from "@/lib/player";

/**
 * The page a shared mix's link opens: `/listen/mix/<id>/`, as the app's Share sends it.
 *
 * WhatsApp and Facebook read a link's preview off the page without running the player, so each mix has a
 * page of its own carrying its title and cover. A visitor is sent straight on to the player with the mix
 * cued (`/listen/?mix=<id>`). On a phone with the app, the App Link opens the app before this page loads.
 *
 * One per mix the sync listed; a mix newer than the last build has no page yet, and `not-found.tsx` sends
 * its link to the player all the same.
 */

/** Only the mixes the sync listed: a static export has no server to render any other. */
export const dynamicParams = false;

export function generateStaticParams() {
  return siteContent.sharedMixes.map((mix) => ({ id: mix.id }));
}

function findMix(id: string) {
  return siteContent.sharedMixes.find((mix) => mix.id === id);
}

/** `1 h 20 min · 518 plays`: what the preview says under the title. */
function mixDetails(durationSeconds: number, plays: number): string {
  return [formatDuration(durationSeconds), plays > 0 ? `${formatCount(plays)} plays` : ""]
    .filter(Boolean)
    .join(" · ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const mix = findMix((await params).id);
  if (!mix) return {};

  const details = mixDetails(mix.durationSeconds, mix.plays);
  const description = [details, `A mix by ${siteConfig.name}, Kisumu.`].filter(Boolean).join(" — ");
  const images = mix.artworkUrl ? [{ url: mix.artworkUrl, width: 500, height: 500, alt: mix.title }] : undefined;

  return {
    title: mix.title,
    description,
    alternates: { canonical: `/listen/mix/${mix.id}/` },
    openGraph: {
      type: "music.song",
      url: `/listen/mix/${mix.id}/`,
      siteName: siteConfig.name,
      title: mix.title,
      description,
      images,
    },
    twitter: { card: "summary", title: mix.title, description, images },
    // A way into the player, not a page of its own to find
    robots: { index: false, follow: true },
  };
}

export default async function SharedMixPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mix = findMix(id);
  const player = playerHref(id);

  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <meta httpEquiv="refresh" content={`0; url=${player}`} />
      <p className="text-muted">
        Opening {mix?.title ?? "the mix"}…{" "}
        <a href={player} className="text-accent underline">
          Play it
        </a>
      </p>
    </main>
  );
}

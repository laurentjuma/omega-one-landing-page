import { Section, SectionHeader } from "@/components/section";
import type { AboutContent } from "@/lib/content";

/** `aboutStorySection`: the lede, then the milestones as a year-column timeline. */
export function Story({ story }: { story: AboutContent["story"] }) {
  return (
    <Section id="story">
      <SectionHeader title={story.title} note={story.note} />

      <p className="mt-6 max-w-3xl text-base/relaxed text-muted sm:text-lg/relaxed">
        {story.lede}
      </p>

      <ol className="mt-10 divide-y divide-line border-t border-line">
        {story.milestones.map((milestone) => (
          <li
            key={`${milestone.year}-${milestone.title}`}
            className="grid gap-2 py-6 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-8"
          >
            <p className="tnum label pt-1 text-accent">{milestone.year}</p>
            <div className="max-w-2xl">
              <h3 className="font-black uppercase tracking-[0.02em]">{milestone.title}</h3>
              <p className="mt-2 text-muted">{milestone.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

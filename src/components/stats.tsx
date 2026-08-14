import type { AboutContent } from "@/lib/content";

/** `AboutStatsRow`: the numbers, divided, on the elevated surface. */
export function Stats({ stats }: { stats: AboutContent["stats"] }) {
  if (stats.length === 0) return null;

  return (
    <div className="shell pb-14 sm:pb-20">
      <dl className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-2xl bg-surface ring-1 ring-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-7">
            <dd className="display tnum text-[clamp(2rem,5vw,2.75rem)]">{stat.value}</dd>
            <dt className="label mt-2 text-subtle">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

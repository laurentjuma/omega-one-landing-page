import { ContentIcon } from "@/components/icons";
import { Card, Section, SectionHeader } from "@/components/section";
import type { AboutContent } from "@/lib/content";

/** `aboutServicesSection`: what the company hires out, as cards on the elevated surface. */
export function Services({ services }: { services: AboutContent["services"] }) {
  if (services.items.length === 0) return null;

  return (
    <Section id="services">
      <SectionHeader title={services.title} note={services.note} />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((service) => (
          <li key={service.title}>
            <Card className="h-full p-6 transition-colors hover:bg-surface-raised">
              <ContentIcon name={service.icon} className="size-6 text-accent" />
              <h3 className="mt-5 font-black uppercase tracking-[0.04em]">{service.title}</h3>
              <p className="mt-2 text-sm/relaxed text-muted">{service.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

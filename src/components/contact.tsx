import { ArrowUpRightIcon, ContentIcon } from "@/components/icons";
import { Card, Section, SectionHeader } from "@/components/section";
import type { AboutContent } from "@/lib/content";

/** `aboutContactSection`: the ways in, the booking CTA, the socials, and the status line. */
export function Contact({
  contact,
  links,
}: {
  contact: AboutContent["contact"];
  links: AboutContent["links"];
}) {
  return (
    <Section id="contact">
      <SectionHeader title={contact.title} note={contact.note} />

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        {contact.rows.length > 0 ? (
          <Card className="divide-y divide-line overflow-hidden">
            {contact.rows.map((row) => (
              <a
                key={row.label}
                href={row.uri}
                className="flex items-center gap-5 p-5 transition-colors hover:bg-surface-raised"
              >
                <ContentIcon name={row.icon} className="size-5 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="label block text-subtle">{row.label}</span>
                  <span className="mt-1 block truncate">{row.value}</span>
                </span>
              </a>
            ))}
          </Card>
        ) : null}

        <div className="flex flex-col justify-center gap-6">
          {contact.cta ? (
            <a
              href={contact.ctaUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-black uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-fg hover:text-bg"
            >
              {contact.cta}
              <ArrowUpRightIcon className="size-4" />
            </a>
          ) : null}

          {links.length > 0 ? (
            <ul className="flex flex-wrap gap-3">
              {links.map((link) => (
                <li key={link.uri}>
                  <a
                    href={link.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex rounded-full px-5 py-3 ring-1 ring-inset ring-line-strong transition-colors hover:bg-fg/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="label inline-flex items-center gap-2 text-live">
              <span className="size-2 rounded-full bg-live" aria-hidden="true" />
              {contact.status}
            </span>
            <span className="text-sm text-subtle">{contact.hours}</span>
          </p>
        </div>
      </div>
    </Section>
  );
}

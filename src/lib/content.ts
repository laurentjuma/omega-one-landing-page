import { z } from "zod";

import generated from "@/content/site-content.generated.json";

/**
 * The page's content: the About copy and photography the app publishes, plus its newest mixes.
 *
 * Both are pulled into the repo by `scripts/sync-content.mjs` and validated here, once, at module
 * scope — the site is exported as static files, so there is nothing left at runtime to fetch or
 * resize. A publish reaches the page through a sync and a build, which CI runs on a schedule.
 *
 * The schemas are forgiving: anything the page can live without has a default, so adding a field to
 * the published content never breaks a build, in the spirit of `AboutContentLoader`'s
 * `ignoreUnknownKeys`.
 */

/** An image already downloaded, resized and written to `public/media` by the sync. */
const imageSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
  /** The larger copy the gallery viewer opens, where one was made. */
  large: z.string().optional(),
});

const shotSchema = z.object({
  index: z.string().default(""),
  caption: z.string().default(""),
  description: z.string().default(""),
  image: imageSchema.nullish().transform((value) => value ?? null),
});

const gallerySchema = z.object({
  title: z.string().default(""),
  note: z.string().default(""),
  shots: z.array(shotSchema).default([]),
});

const aboutSchema = z.object({
  title: z.string().default("About Us"),
  hero: z.object({
    eyebrow: z.string().default(""),
    title: z.string().default(""),
    titleAccent: z.string().default(""),
    subtitle: z.string().default(""),
    image: imageSchema.nullish().transform((value) => value ?? null),
  }),
  story: z.object({
    title: z.string().default(""),
    note: z.string().default(""),
    lede: z.string().default(""),
    milestones: z
      .array(
        z.object({
          year: z.string().default(""),
          title: z.string().default(""),
          text: z.string().default(""),
        }),
      )
      .default([]),
  }),
  stats: z
    .array(z.object({ value: z.string().default(""), label: z.string().default("") }))
    .default([]),
  room: gallerySchema,
  legends: gallerySchema,
  services: z.object({
    title: z.string().default(""),
    note: z.string().default(""),
    items: z
      .array(
        z.object({
          icon: z.string().default(""),
          title: z.string().default(""),
          text: z.string().default(""),
        }),
      )
      .default([]),
  }),
  contact: z.object({
    title: z.string().default(""),
    note: z.string().default(""),
    rows: z
      .array(
        z.object({
          icon: z.string().default(""),
          label: z.string().default(""),
          value: z.string().default(""),
          uri: z.string().default(""),
        }),
      )
      .default([]),
    cta: z.string().default(""),
    ctaUri: z.string().default(""),
    status: z.string().default(""),
    hours: z.string().default(""),
  }),
  links: z
    .array(z.object({ label: z.string().default(""), uri: z.string().default("") }))
    .default([]),
  colophon: z.string().default(""),
});

/**
 * A mix. The preview still streams from where the app's audio is hosted; only the artwork is local.
 */
const mixSchema = z.object({
  id: z.string(),
  title: z.string().default(""),
  description: z.string().default(""),
  durationSeconds: z.number().default(0),
  /** Milliseconds, for `Date`. */
  releasedAt: z.number().default(0),
  previewUrl: z.string().default(""),
  plays: z.number().default(0),
  artwork: imageSchema.nullish().transform((value) => value ?? null),
});

const siteContentSchema = z.object({
  /** When the sync last ran, ISO 8601. */
  syncedAt: z.string(),
  about: aboutSchema,
  mixes: z.array(mixSchema),
});

export type ContentImage = z.infer<typeof imageSchema>;
export type AboutContent = z.infer<typeof aboutSchema>;
export type AboutGallery = z.infer<typeof gallerySchema>;
export type AboutShot = z.infer<typeof shotSchema>;
export type Mix = z.infer<typeof mixSchema>;

/** Throws at build time if the generated file is missing a field the page needs. */
export const siteContent = siteContentSchema.parse(generated);

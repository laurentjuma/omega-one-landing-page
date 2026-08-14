import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";

/** Written to a file at build time, as a static export has no server to generate it on request. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

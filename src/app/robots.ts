import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";

/** Written to a file at build time, as a static export has no server to generate it on request. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

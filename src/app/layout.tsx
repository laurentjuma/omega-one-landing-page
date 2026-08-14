import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";

import { asset } from "@/lib/asset";
import { siteConfig } from "@/lib/config";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

import "./globals.css";

/** Figtree stands in for the app's Circular: the same geometric sans voice, servable on the web. */
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — the first and the last of its kind`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Omega One Sounds",
    "Kisumu",
    "Kenya",
    "sound system",
    "mobile disco",
    "live sound hire",
    "benga",
    "ohangla",
    "rumba",
    "DJ mixes",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — the first and the last of its kind`,
    description: siteConfig.description,
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — since 1983`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  /** The default palette's ground, so the browser chrome agrees with the page on arrival. */
  themeColor: "#f4f8f7",
  colorScheme: "light dark",
};

/**
 * The two versions of the mark, handed to CSS as URLs that already carry the base path — a stylesheet
 * cannot work out where the site is mounted. The themes in `globals.css` pick one via `--logo`, so the
 * browser downloads only the variant in use.
 */
const LOGO_VARIABLES = `:root{--logo-on-dark:url("${asset(
  "/omega-mark-on-dark.webp",
)}");--logo-on-light:url("${asset("/omega-mark-on-light.webp")}")}`;

/**
 * Structured data: the company, and the app the page is selling. No ratings or install counts —
 * nothing here is claimed that the Play listing does not already say.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      foundingDate: String(siteConfig.since),
      genre: ["Benga", "Ohangla", "Rumba", "Reggae"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kisumu",
        addressCountry: "KE",
      },
      url: siteConfig.url,
      sameAs: [
        "https://www.instagram.com/omegaoneevents/",
        "https://www.facebook.com/Omegaonekisumu/",
      ],
    },
    {
      "@type": "MobileApplication",
      name: `${siteConfig.name} app`,
      applicationCategory: "MusicApplication",
      operatingSystem: "Android",
      installUrl: siteConfig.playStore.url,
      url: siteConfig.playStore.url,
      publisher: { "@id": `${siteConfig.url}#organization` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "KES" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <head>
        {/* Both authored above; nothing user-supplied reaches either. */}
        <style dangerouslySetInnerHTML={{ __html: LOGO_VARIABLES }} />
        {/* Before first paint, so a chosen theme never flashes the default one. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/config";

/** The share card. Generated at build time, so the logo is read straight off disk. */

/** Rendered to a file at build time, as a static export has no server to render it on request. */
export const dynamic = "force-static";

export const alt = `${siteConfig.name} — the first and the last of its kind`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // PNG rather than the page's WebP: satori decodes PNG and JPEG only.
  const logo = await readFile(join(process.cwd(), "src/assets/omega-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0b1416",
          backgroundImage:
            "radial-gradient(120% 80% at 85% 0%, rgba(52,214,163,0.30), transparent 60%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#34d6a3",
              fontWeight: 700,
            }}
          >
            Kisumu · Since 1983
          </div>
          {/* satori renders a plain img, not next/image */}
          <img src={logoSrc} alt="" width={360} height={236} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: -2,
            }}
          >
            The first and
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: -2,
              color: "#34d6a3",
            }}
          >
            the last of its kind
          </div>
          <div
            style={{
              marginTop: 34,
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#34d6a3",
                color: "#04211b",
                padding: "14px 28px",
                borderRadius: 999,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Get it on Google Play
            </div>
            <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
              Live sound · Mobile disco · Four decades of mixes
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

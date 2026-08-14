/* eslint-disable @next/next/no-img-element -- the sizes are cut at build time by the content sync;
   a static export has no image optimiser for `next/image` to reach. */
import { asset } from "@/lib/asset";
import type { ContentImage } from "@/lib/content";

/**
 * A content photograph.
 *
 * Plain `<img>`, not `next/image`: the sizes are already cut by `scripts/sync-content.mjs`, so there
 * is nothing left for an optimiser to do and a static export has no optimiser anyway. Intrinsic
 * dimensions ride along so the layout never jumps.
 */
export function PageImage({
  image,
  alt,
  /** Use the larger copy the sync wrote, where the viewer wants it. */
  large = false,
  className = "",
  loading = "lazy",
  sizes,
}: {
  image: ContentImage;
  alt: string;
  large?: boolean;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
}) {
  const src = large && image.large ? image.large : image.src;

  return (
    <img
      src={asset(src)}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={loading}
      decoding="async"
      sizes={sizes}
      className={className}
    />
  );
}

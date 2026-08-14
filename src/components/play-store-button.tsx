import { GooglePlayIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";

/**
 * The download call to action, in one place so every instance on the page — header, hero, the band
 * under the mixes, the footer — points at the same listing and reads the same way.
 *
 * Ink on accent rather than the app's white on accent: the same two brand colours, the way round
 * that passes contrast at button sizes.
 */

type Size = "sm" | "md" | "lg";
type Variant = "solid" | "outline";

const SIZES: Record<Size, { frame: string; icon: string; kicker: string; label: string }> = {
  sm: {
    frame: "gap-2 rounded-full px-4 py-2",
    icon: "size-4",
    kicker: "hidden",
    label: "text-[0.7rem] tracking-[0.12em]",
  },
  md: {
    frame: "gap-3 rounded-full px-5 py-3",
    icon: "size-5",
    kicker: "text-[0.6rem]",
    label: "text-sm tracking-[0.1em]",
  },
  lg: {
    frame: "gap-3.5 rounded-full px-7 py-4",
    icon: "size-7",
    kicker: "text-[0.65rem]",
    label: "text-base sm:text-lg tracking-[0.08em]",
  },
};

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-accent text-accent-fg shadow-[0_10px_40px_-12px] shadow-accent/50 hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg",
  outline: "text-fg ring-1 ring-inset ring-line-strong hover:bg-fg/10",
};

export function PlayStoreButton({
  size = "md",
  variant = "solid",
  label = "Google Play",
  kicker = "Get it on",
  className = "",
}: {
  size?: Size;
  variant?: Variant;
  label?: string;
  kicker?: string;
  className?: string;
}) {
  const styles = SIZES[size];

  return (
    <a
      href={siteConfig.playStore.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download the ${siteConfig.name} app on Google Play`}
      className={`group inline-flex items-center justify-center font-black uppercase transition-colors ${styles.frame} ${VARIANTS[variant]} ${className}`}
    >
      <GooglePlayIcon className={styles.icon} />
      <span className="text-left leading-none">
        <span className={`block font-bold tracking-[0.18em] opacity-70 ${styles.kicker}`}>
          {kicker}
        </span>
        <span className={`block ${styles.label}`}>{label}</span>
      </span>
    </a>
  );
}

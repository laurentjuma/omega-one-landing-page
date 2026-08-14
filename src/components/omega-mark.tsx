/**
 * The Omega One mark with sound waves rolling out of the speaker cone — the web reading of
 * `AnimatedOmegaLogo`. There is no playback to follow here, so it breathes on the app's idle loop.
 *
 * The artwork is a themed background image (`--logo`), not an `<img>`: the app ships a light-on-dark
 * and a dark-on-light version of the mark, and a background means the browser fetches only the one
 * the current theme asks for. The cone sits at 84.5% / 23% of the artwork, the same offsets the
 * Compose version uses.
 */

const CONE_X = "84.5%";
const CONE_Y = "23%";
const RING_COUNT = 3;
const CYCLE_SECONDS = 3.2;

export function OmegaMark({
  className = "",
  label,
}: {
  className?: string;
  /** Given only where the mark carries meaning; as a watermark it stays decorative. */
  label?: string;
}) {
  return (
    <div className={`relative aspect-[1100/723] ${className}`}>
      <div
        className="pointer-events-none absolute size-[42%] -translate-x-1/2 -translate-y-1/2"
        style={{ left: CONE_X, top: CONE_Y }}
        aria-hidden="true"
      >
        {/* Glow behind the cone. */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, color-mix(in oklab, var(--pulse) 30%, transparent), transparent 70%)",
          }}
        />
        {Array.from({ length: RING_COUNT }, (_, index) => (
          <div
            key={index}
            className="animate-ring absolute inset-0 rounded-full border"
            style={{
              borderColor: "var(--pulse)",
              animationDelay: `${(index * CYCLE_SECONDS) / RING_COUNT}s`,
            }}
          />
        ))}
      </div>
      <div
        className="logo-mark animate-breathe relative size-full"
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      />
    </div>
  );
}

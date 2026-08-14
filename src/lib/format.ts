/** Formatting helpers shared by the mixes and stats sections. */

/** `4850` -> `1 h 20 min`, `640` -> `10 min`. Mixes run for hours, so hours lead. */
export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";

  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

/** `mm:ss` / `h:mm:ss`, for the player's running time. */
export function formatClock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const secs = whole % 60;
  const paddedSecs = String(secs).padStart(2, "0");

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${paddedSecs}`
    : `${minutes}:${paddedSecs}`;
}

/**
 * `11 Aug 2026`. Pinned to en-GB and UTC so the server-rendered date cannot disagree with the
 * client's locale and trip a hydration mismatch.
 */
export function formatDate(timestampMs: number): string {
  if (!timestampMs) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestampMs));
}

/** `5058` -> `5,058`. */
export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-GB").format(value);
}

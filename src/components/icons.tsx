import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * The icon set the About content asks for by name (`tune`, `bolt`, `mic`, …), drawn here rather than
 * pulled from an icon font: ten shapes are not worth a webfont, and these can carry `currentColor`.
 */

type IconProps = ComponentPropsWithoutRef<"svg">;

function Glyph({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Faders — live sound. */
export function TuneIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
      <circle cx="9" cy="7" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="2" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

/** Lightning — stage and power. */
export function BoltIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M13 2 5 13.5h5L10 22l8-11.5h-5L13 2Z" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

/** Microphone — the studio. */
export function MicIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.5M8.5 21.5h7" />
    </Glyph>
  );
}

/** Record — the mobile disco. */
export function AlbumIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

/** Megaphone — rallies and tours. */
export function CampaignIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 9.5 15 5v14L4 14.5V9.5Z" />
      <path d="M7 13v5.5a1.5 1.5 0 0 0 3 0V14" />
      <path d="M18 9.5a3.5 3.5 0 0 1 0 5M20.5 7a7 7 0 0 1 0 10" />
    </Glyph>
  );
}

/** Two heads — DJ development. */
export function GroupsIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <circle cx="16.5" cy="9.5" r="2.3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 14.2c2.4.2 4.5 1.9 4.5 4.8" />
    </Glyph>
  );
}

/** Speech bubble — WhatsApp. */
export function ChatIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M20.5 12.2c0 4-3.8 7.2-8.5 7.2a9.8 9.8 0 0 1-2.7-.4L4.5 20.5l1.2-3.3A6.9 6.9 0 0 1 3.5 12.2C3.5 8.2 7.3 5 12 5s8.5 3.2 8.5 7.2Z" />
    </Glyph>
  );
}

/** Handset — phone. */
export function CallIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M7.5 3.5c.8 0 1.5.5 1.7 1.3l.7 2.4a1.8 1.8 0 0 1-.5 1.8l-1.2 1.1a11.5 11.5 0 0 0 4.7 4.7l1.1-1.2a1.8 1.8 0 0 1 1.8-.5l2.4.7c.8.2 1.3.9 1.3 1.7v2.3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2h2Z" />
    </Glyph>
  );
}

/** Envelope — email. */
export function MailIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 8 7.1 5a1.6 1.6 0 0 0 1.8 0L20 8" />
    </Glyph>
  );
}

/** Pin — where we are. */
export function PlaceIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 21.5s7-6.4 7-11.4a7 7 0 1 0-14 0c0 5 7 11.4 7 11.4Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Glyph>
  );
}

/** Tray with an arrow — downloads, offline. */
export function DownloadIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 3.5v11m0 0 4-4m-4 4-4-4" />
      <path d="M4.5 17.5v1.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-1.5" />
    </Glyph>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M8 4.8 19 12 8 19.2V4.8Z" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M8.5 5h2.2v14H8.5zM13.3 5h2.2v14h-2.2z" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 4.5v15m0 0 5.5-5.5M12 19.5 6.5 14" />
    </Glyph>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M7 17 17 7m0 0H9m8 0v8" />
    </Glyph>
  );
}

export function HeadphonesIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.8" y="13.5" width="4.4" height="7" rx="2.2" />
      <rect x="16.8" y="13.5" width="4.4" height="7" rx="2.2" />
    </Glyph>
  );
}

/** The Play Store mark, monochrome: the store's silhouette without appropriating its colours. */
export function GooglePlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3.9 2.3a1.4 1.4 0 0 0-.4 1v17.4a1.4 1.4 0 0 0 .4 1l9.2-9.7L3.9 2.3Z" />
      <path d="m14.5 10.6 2.9-3-9.9-5.4a1.6 1.6 0 0 0-1.9.2l8.9 8.2Z" opacity="0.85" />
      <path d="m14.5 13.4-8.9 8.2a1.6 1.6 0 0 0 1.9.2l9.9-5.4-2.9-3Z" opacity="0.85" />
      <path d="m18.8 10 2.4 1.3c1 .6 1 1.8 0 2.4L18.8 15l-3-3 3-2Z" opacity="0.7" />
    </svg>
  );
}

/** Maps the `icon` strings in the published content onto the set above. */
const ICONS: Record<string, (props: IconProps) => ReactNode> = {
  tune: TuneIcon,
  bolt: BoltIcon,
  mic: MicIcon,
  album: AlbumIcon,
  campaign: CampaignIcon,
  groups: GroupsIcon,
  chat: ChatIcon,
  call: CallIcon,
  mail: MailIcon,
  place: PlaceIcon,
  download: DownloadIcon,
  headphones: HeadphonesIcon,
};

/** Unknown names fall back to the record, which is never wrong for a sound company. */
export function ContentIcon({ name, ...props }: IconProps & { name: string }) {
  const Icon = ICONS[name] ?? AlbumIcon;
  return <Icon {...props} />;
}

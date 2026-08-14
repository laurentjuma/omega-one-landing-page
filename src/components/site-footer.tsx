import { PlayStoreButton } from "@/components/play-store-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/lib/config";

/** `aboutColophonSection`, plus the theme picker and one last way to the store. */
export function SiteFooter({ colophon }: { colophon: string }) {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col items-start justify-between gap-8 py-12 sm:flex-row sm:items-center">
        <div>
          <p className="label text-subtle">{colophon}</p>
          <p className="mt-3 text-sm text-subtle">
            The app is free on{" "}
            <a
              href={siteConfig.playStore.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline-offset-4 hover:underline"
            >
              Google Play
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col items-start gap-5 sm:items-end">
          <PlayStoreButton size="md" />
          <div className="flex items-center gap-3">
            <span className="label text-subtle">Theme</span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

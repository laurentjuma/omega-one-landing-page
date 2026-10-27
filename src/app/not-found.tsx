/**
 * The site's 404 (GitHub Pages serves it for any address it has no file for), as Next's own looks.
 *
 * One address it catches on purpose: a shared mix's link (`/listen/mix/<id>/`) for a mix newer than the
 * last build, which has no page yet. It goes to the player with the mix cued, without the preview the
 * built pages carry. Inline and before paint, so the 404 never shows on the way.
 */
const SHARED_MIX_SCRIPT = `(function () {
  var match = location.pathname.match(/^(.*)\\/listen\\/mix\\/([^/]+)\\/?$/);
  if (match) location.replace(match[1] + "/listen/?mix=" + match[2]);
})();`;

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <script dangerouslySetInnerHTML={{ __html: SHARED_MIX_SCRIPT }} />
      <p>
        <span className="mr-4 border-r border-line pr-4 text-2xl font-medium">404</span>
        This page could not be found.
      </p>
    </main>
  );
}

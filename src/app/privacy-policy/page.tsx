import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/config";
import { siteContent } from "@/lib/content";

/**
 * The privacy policy the Play listing links to. It describes what the app and this site actually do —
 * keep it in step with the app when a data flow changes (a new SDK, a new account field, a new server).
 */

const CONTACT_EMAIL = "c4entertainment254@gmail.com";
const EFFECTIVE_DATE = "15 November 2026";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How the ${siteConfig.name} app and website use your information.`,
  alternates: { canonical: "/privacy-policy/" },
};

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-8 text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 text-lg font-semibold">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-muted">{children}</p>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-muted">{children}</ul>;
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="text-fg underline underline-offset-4"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

const mail = <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>;

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="border-b border-line">
        <div className="shell py-6">
          <Link href="/" className="label whitespace-nowrap">
            ← {siteConfig.name}
          </Link>
        </div>
      </header>

      <main className="shell max-w-3xl py-16">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Privacy policy</h1>
        <p className="label mt-4 text-subtle">Effective {EFFECTIVE_DATE}</p>

        <P>
          This policy explains what information the {siteConfig.name} app for Android (the “app”) and the
          website at omegaonesounds.com (the “site”) collect, why, who it is shared with, and the choices you
          have. The app and site are run by c4 Tech for {siteConfig.name}, Kisumu, Kenya (“we”, “us”). If
          anything here is unclear, write to us at {mail}.
        </P>

        <H2>Summary</H2>
        <List>
          <li>You can listen without an account. Your playlists, downloads and settings stay on your phone.</li>
          <li>
            The app uses Google services for usage statistics, crash reports, notifications and ads. These use
            identifiers from your device.
          </li>
          <li>
            If you create a shop account or buy something, Shopify handles your account and checkout. We never
            see your card details.
          </li>
          <li>We don’t sell your information.</li>
        </List>

        <H2>What the app collects</H2>

        <H3>When you use the app (no account needed)</H3>
        <List>
          <li>
            <strong>Device identifier.</strong> The app reads your device’s Android ID. It is sent with requests
            to hearthis.at, where our mixes are hosted, and is used as the identifier for our usage statistics,
            so we can count listeners without knowing who they are.
          </li>
          <li>
            <strong>How you use the app.</strong> Through Google Analytics for Firebase we record events such as
            the mixes you play, what you search for, playlists you create, downloads, and the settings you
            change, together with your device model, Android version, app version, language and approximate
            location (country/region, from your IP address).
          </li>
          <li>
            <strong>Crash reports.</strong> If the app crashes, Firebase Crashlytics sends a report with the error,
            the state of the app, and your device and Android version.
          </li>
          <li>
            <strong>Notifications.</strong> To send you news and new mixes, Firebase Cloud Messaging gives your
            device a notification token. We register that token with hearthis.at so notifications can be
            delivered. You can turn notifications off in Android’s settings at any time.
          </li>
          <li>
            <strong>Ads.</strong> The app shows ads from Google AdMob. Google may collect your advertising ID, IP
            address, and information about the ads you see and tap, to show and measure ads and, where allowed,
            to personalise them. See <A href="#ads">Ads</A> below.
          </li>
          <li>
            <strong>App settings and updates.</strong> The app downloads its news feed, configuration and update
            information from GitHub, and checks Google Play for updates. These requests carry your IP address,
            as any internet request does, but no identifier of yours.
          </li>
          <li>
            <strong>Videos.</strong> Videos in the news feed play through YouTube, which applies Google’s own
            privacy policy.
          </li>
        </List>

        <H3>When you create a shop account</H3>
        <P>
          The shop is run on Shopify. To create an account you give your first and last name, email address and
          a password; these go to Shopify, which stores them. The app keeps you signed in by saving a sign-in
          token and your name and email on your phone; signing out removes them.
        </P>
        <P>
          New accounts are subscribed to email news and offers from {siteConfig.name}. Every such email has an
          unsubscribe link, or you can ask us at {mail}.
        </P>

        <H3>When you buy something</H3>
        <P>
          Checkout is Shopify’s own secure checkout, shown inside the app. Shopify collects what is needed to
          complete your order — such as your name, email, phone number, delivery address and payment details —
          and passes us the order details we need to fulfil it. Card and other payment details are handled by
          Shopify and its payment providers; they never reach us or the app.
        </P>

        <H3>What stays on your phone</H3>
        <P>
          Your playlists, downloaded mixes, where you stopped in a mix, and your settings are stored only on your
          phone. If you make a backup in the app, the backup file is saved where you choose. We don’t receive any
          of this.
        </P>

        <H3>Permissions the app asks for</H3>
        <List>
          <li>
            <strong>Notifications</strong> — for news, new mixes and download progress.
          </li>
          <li>
            <strong>Internet and network state</strong> — to stream mixes and know when you’re offline.
          </li>
          <li>
            <strong>Foreground service and wake lock</strong> — to keep playing when the screen is off.
          </li>
          <li>
            <strong>Folders you choose</strong> — if you pick a folder for downloads, the app only uses that
            folder.
          </li>
        </List>

        <H2>The website</H2>
        <P>
          The site has no analytics, ads or tracking cookies. It remembers your theme choice in your browser’s
          local storage. The web player streams mixes from hearthis.at. The site is hosted by GitHub Pages,
          which, like any web host, logs visitors’ IP addresses to run and protect the service.
        </P>

        <H2 id="ads">Ads</H2>
        <P>
          Ads in the app are served by Google AdMob. Google may use your device’s advertising ID and cookies to
          show ads based on your interests, limit how often you see an ad, and measure results. You can reset or
          delete your advertising ID, or opt out of personalised ads, in Android’s settings (Settings → Google →
          Ads, or Settings → Privacy → Ads, depending on your phone). You’ll still see ads, but they won’t be
          personalised. Read how Google uses information from apps that use its services at{" "}
          <A href="https://policies.google.com/technologies/partner-sites">
            policies.google.com/technologies/partner-sites
          </A>
          .
        </P>

        <H2>How we use information</H2>
        <List>
          <li>To stream mixes, run the shop and deliver your orders.</li>
          <li>To understand which mixes and features people use, and to fix crashes.</li>
          <li>To send you notifications and, if you have a shop account, emails you haven’t unsubscribed from.</li>
          <li>To show ads, which keep the app free.</li>
          <li>To prevent fraud and abuse, and to meet our legal obligations.</li>
        </List>

        <H2>Who we share it with</H2>
        <P>We share information only with the services that run the app and site for us:</P>
        <List>
          <li>
            <strong>Google</strong> — Firebase Analytics, Crashlytics, Cloud Messaging and Remote Config, AdMob,
            Google Play and YouTube (<A href="https://policies.google.com/privacy">privacy policy</A>).
          </li>
          <li>
            <strong>hearthis.at</strong> — hosts and streams our mixes, and receives the notification token and
            device identifier described above (
            <A href="https://hearthis.at/privacy/">privacy policy</A>).
          </li>
          <li>
            <strong>Shopify</strong> — shop accounts, orders and checkout (
            <A href="https://www.shopify.com/legal/privacy">privacy policy</A>).
          </li>
          <li>
            <strong>GitHub</strong> — hosts the site and the app’s content files (
            <A href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">
              privacy statement
            </A>
            ).
          </li>
        </List>
        <P>
          We may also disclose information if the law requires it, or to protect our rights or the safety of our
          users. We don’t sell personal information. These services may process information outside Kenya and
          the UK, including in the United States, under their own safeguards for international transfers.
        </P>

        <H2>How long we keep it</H2>
        <P>
          Usage statistics are kept for the retention period set in Google Analytics, at most 14 months. Crash
          reports are kept by Crashlytics for 90 days. Shop accounts are kept until you ask us to delete them;
          order records are kept as long as tax and accounting law requires. Data on your phone stays there until
          you delete it or uninstall the app.
        </P>

        <H2 id="delete-account">Your choices and rights</H2>
        <List>
          <li>
            <strong>Delete your shop account.</strong> Email {mail} from the address on the account with the
            subject “Delete my account”. We’ll delete the account and its personal information within 30 days,
            except order records we must keep by law.
          </li>
          <li>
            <strong>Access, correct or delete your information</strong>, or object to how we use it: email{" "}
            {mail}. Depending on where you live (for example under Kenya’s Data Protection Act or the UK GDPR) you
            may also complain to your data protection authority.
          </li>
          <li>
            <strong>Usage statistics and ads</strong> are tied to your device’s identifiers, not to your name.
            Resetting your advertising ID, or uninstalling the app, ends the link to your past data.
          </li>
          <li>
            <strong>Notifications and emails</strong> can be turned off in Android’s settings and with the
            unsubscribe link in any email.
          </li>
        </List>

        <H2>Children</H2>
        <P>
          The app and site are not directed at children under 13, and we don’t knowingly collect their
          information. If you believe a child has given us information, contact us and we’ll delete it.
        </P>

        <H2>Security</H2>
        <P>
          Information sent by the app and site travels over encrypted connections (HTTPS). No system is
          completely secure, but we and the services we use take reasonable steps to protect it.
        </P>

        <H2>Changes</H2>
        <P>
          When we change this policy we’ll update it here and change the effective date at the top. Significant
          changes will also be announced in the app.
        </P>

        <H2>Contact</H2>
        <P>
          c4 Tech, for {siteConfig.name}, Kisumu, Kenya — {mail}
        </P>
      </main>

      <SiteFooter colophon={siteContent.about.colophon} />
    </>
  );
}

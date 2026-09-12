import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import Link from "next/link";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "1. Using Pulse",
    body: (
      <p>
        By creating an account or reading a story on Pulse, you're agreeing to
        these terms. If something here doesn't sit right with you, the
        simplest option is not to use the platform — but we'd genuinely
        rather you told us instead, so we can fix it.
      </p>
    ),
  },
  {
    id: "accounts",
    heading: "2. Your Account",
    body: (
      <>
        <p>
          You're responsible for keeping your login details private and for
          anything that happens under your account. If you signed up with
          Google or GitHub, the same applies — we just trust them to verify
          who you are.
        </p>
        <p>
          You need to be old enough to legally agree to these terms in your
          country. If we find an account that doesn't meet that bar, we may
          suspend it.
        </p>
      </>
    ),
  },
  {
    id: "content",
    heading: "3. Stories You Publish",
    body: (
      <>
        <p>
          When you write a post on Pulse, it stays yours. Publishing it here
          gives us permission to host, display, and distribute it on the
          platform — nothing more. We don't claim ownership of your words.
        </p>
        <p>
          You're responsible for what you publish. Don't post anything you
          don't have the right to share, and don't use Pulse to publish
          content that's illegal, harassing, or knowingly false.
        </p>
      </>
    ),
  },
  {
    id: "conduct",
    heading: "4. Community Guidelines",
    body: (
      <p>
        Pulse is built around slow, thoughtful reading — we'd like the
        comments and interactions here to match that. Be respectful, don't
        spam, and don't try to manipulate likes, views, or comment counts.
        Accounts that consistently break this may be limited or removed.
      </p>
    ),
  },
  {
    id: "termination",
    heading: "5. Suspending or Closing an Account",
    body: (
      <p>
        You can delete your account at any time. We may suspend or remove an
        account that violates these terms, with notice where reasonably
        possible.
      </p>
    ),
  },
  {
    id: "disclaimer",
    heading: "6. No Guarantees",
    body: (
      <p>
        Pulse is provided "as is." We work to keep it reliable and the
        content accurate, but we can't promise it will always be available,
        error-free, or exactly what you expected — especially while the
        platform is actively evolving.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "7. Changes to These Terms",
    body: (
      <p>
        We may update these terms as Pulse grows. If a change is significant,
        we'll do our best to let you know before it takes effect. Continuing
        to use Pulse after an update means you accept the new terms.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "8. Contact",
    body: (
      <p>
        Pulse is a product of{" "}
        <Link
          href="https://prex-sand.vercel.app/ar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          PREX
        </Link>
        . Questions about these terms can be sent through the contact details
        on the PREX website.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="September 2026"
      intro={
        <>
          <p>
            We tried to keep this readable rather than burying it in
            boilerplate. It covers the basics: what you can expect from
            Pulse, and what we expect from you.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            Note: this is placeholder legal content drafted for a template —
            have it reviewed by a lawyer before it governs a live product.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
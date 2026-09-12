import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import Link from "next/link";

const sections: LegalSection[] = [
  {
    id: "overview",
    heading: "1. Overview",
    body: (
      <p>
        This explains what Pulse collects when you use the platform, why, and
        what say you have over it. We collect as little as we reasonably can
        — a reading platform doesn't need to know much about you to work
        well.
      </p>
    ),
  },
  {
    id: "collect",
    heading: "2. What We Collect",
    body: (
      <>
        <p>
          <strong className="text-foreground">Account info:</strong> your
          name, email, and password (or your Google/GitHub identity if you
          sign in that way).
        </p>
        <p>
          <strong className="text-foreground">Content you create:</strong>{" "}
          posts, comments, and likes.
        </p>
        <p>
          <strong className="text-foreground">Usage data:</strong> basic
          analytics like which stories are read or liked, used to power
          features like "Most Viewed."
        </p>
      </>
    ),
  },
  {
    id: "use",
    heading: "3. How We Use It",
    body: (
      <p>
        To run your account, show you the content you've interacted with, keep
        the platform secure, and understand which stories resonate so we can
        publish more of what's actually worth reading.
      </p>
    ),
  },
  {
    id: "cookies",
    heading: "4. Cookies",
    body: (
      <p>
        We use a small number of cookies to keep you logged in and remember
        your preferences. We don't use cookies to sell your data or track you
        across other sites.
      </p>
    ),
  },
  {
    id: "third-party",
    heading: "5. Third-Party Services",
    body: (
      <p>
        We use trusted providers to run parts of Pulse — for example, image
        hosting for cover photos, and Google/GitHub if you choose to sign in
        with them. These providers only receive what's needed to perform
        their function.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "6. How Long We Keep It",
    body: (
      <p>
        We keep your data for as long as your account is active. If you
        delete your account, we remove your personal information within a
        reasonable period, except where we're required to keep it longer for
        legal reasons.
      </p>
    ),
  },
  {
    id: "rights",
    heading: "7. Your Rights",
    body: (
      <p>
        You can access, correct, or delete your personal data at any time
        from your account settings, or by reaching out to us directly.
      </p>
    ),
  },
  {
    id: "children",
    heading: "8. Children's Privacy",
    body: (
      <p>
        Pulse isn't directed at children, and we don't knowingly collect data
        from anyone below the age required to hold an account in their
        country.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "9. Changes to This Policy",
    body: (
      <p>
        If this policy changes in a meaningful way, we'll update the date at
        the top of this page and, where appropriate, let you know directly.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "10. Contact",
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
        . For privacy questions or requests, reach out through the contact
        details on the PREX website.
      </p>
    ),
  },
];

export default function PolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="September 2026"
      intro={
        <>
          <p>
            Your data isn't the product here — the stories are. This page
            covers what we collect, why, and how you're in control of it.
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
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("Legal.terms");

  const sections: LegalSection[] = [
    {
      id: "acceptance",
      heading: t("sections.acceptance.heading"),
      body: <p>{t("sections.acceptance.body")}</p>,
    },
    {
      id: "accounts",
      heading: t("sections.accounts.heading"),
      body: (
        <>
          <p>{t("sections.accounts.body1")}</p>
          <p>{t("sections.accounts.body2")}</p>
        </>
      ),
    },
    {
      id: "content",
      heading: t("sections.content.heading"),
      body: (
        <>
          <p>{t("sections.content.body1")}</p>
          <p>{t("sections.content.body2")}</p>
        </>
      ),
    },
    {
      id: "conduct",
      heading: t("sections.conduct.heading"),
      body: <p>{t("sections.conduct.body")}</p>,
    },
    {
      id: "termination",
      heading: t("sections.termination.heading"),
      body: <p>{t("sections.termination.body")}</p>,
    },
    {
      id: "disclaimer",
      heading: t("sections.disclaimer.heading"),
      body: <p>{t("sections.disclaimer.body")}</p>,
    },
    {
      id: "changes",
      heading: t("sections.changes.heading"),
      body: <p>{t("sections.changes.body")}</p>,
    },
    {
      id: "contact",
      heading: t("sections.contact.heading"),
      body: (
        <p>
          {t("sections.contact.bodyPrefix")}{" "}
          <Link
            href="https://prex-sand.vercel.app/ar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            PREX
          </Link>
          {t("sections.contact.bodySuffix")}
        </p>
      ),
    },
  ];

  return (
    <LegalLayout
      eyebrow={t("eyebrow")}
      title={t("title")}
      lastUpdated={t("lastUpdated")}
      intro={
        <>
          <p>{t("intro1")}</p>
          <p className="mt-3 text-xs text-muted-foreground/70">{t("introNote")}</p>
        </>
      }
      sections={sections}
    />
  );
}

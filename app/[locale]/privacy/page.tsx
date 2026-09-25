import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PolicyPage() {
  const t = useTranslations("Legal.privacy");

  const sections: LegalSection[] = [
    {
      id: "overview",
      heading: t("sections.overview.heading"),
      body: <p>{t("sections.overview.body")}</p>,
    },
    {
      id: "collect",
      heading: t("sections.collect.heading"),
      body: (
        <>
          <p>
            <strong className="text-foreground">{t("sections.collect.accountInfoLabel")}</strong>
            {t("sections.collect.accountInfoText")}
          </p>
          <p>
            <strong className="text-foreground">{t("sections.collect.contentLabel")}</strong>
            {t("sections.collect.contentText")}
          </p>
          <p>
            <strong className="text-foreground">{t("sections.collect.usageLabel")}</strong>
            {t("sections.collect.usageText")}
          </p>
        </>
      ),
    },
    {
      id: "use",
      heading: t("sections.use.heading"),
      body: <p>{t("sections.use.body")}</p>,
    },
    {
      id: "cookies",
      heading: t("sections.cookies.heading"),
      body: <p>{t("sections.cookies.body")}</p>,
    },
    {
      id: "third-party",
      heading: t("sections.thirdParty.heading"),
      body: <p>{t("sections.thirdParty.body")}</p>,
    },
    {
      id: "retention",
      heading: t("sections.retention.heading"),
      body: <p>{t("sections.retention.body")}</p>,
    },
    {
      id: "rights",
      heading: t("sections.rights.heading"),
      body: <p>{t("sections.rights.body")}</p>,
    },
    {
      id: "children",
      heading: t("sections.children.heading"),
      body: <p>{t("sections.children.body")}</p>,
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

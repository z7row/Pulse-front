
import Link from "next/link";
import Image from "next/image";
import { Compass, ArrowLeft } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { nature, royal } from "@/lib/fonts";
import "./[locale]/globals.css"; // أو "@/app/globals.css"

export default async function NotFound() {
  const t = await getTranslations("Error");
  const locale = await getLocale();
  const isRtl = locale === "ar";

  return (
    <main className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background text-foreground">
      <Image
        src="/photos/hero-bg.jpg"
        alt="Misty forest"
        fill
        priority
        className="object-cover  opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40 -z-10" />

      <div className="max-w-md mx-auto px-6 text-center z-10">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
          <Compass className="w-6 h-6 text-accent" />
        </div>

        <span className={`${royal.className} text-accent text-2xl`}>
          {t("offTrail")}
        </span>
        <h1 className={`${nature.className} text-foreground text-6xl md:text-7xl mt-2 mb-4`}>
          {t("notFoundTitle")}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          {t("description")}
        </p>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-pakistan-green text-cornsilk text-sm font-medium hover:bg-dark-moss transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { nature, royal } from "@/lib/fonts";

export default function Error() {
  const t = useTranslations("Error");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <main className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/photos/hero-bg.jpg"
        alt="Misty forest"
        fill
        priority
        className="object-cover -z-10 opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md mx-auto px-6 text-center"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
          <Compass className="w-6 h-6 text-accent" />
        </div>

        <span className={`${royal.className} text-accent text-2xl`}>
          {t("offTrail")}
        </span>
        <h1 className={`${nature.className} text-foreground text-6xl md:text-7xl mt-2 mb-4`}>
          {t("serverErrorTitle")}
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
      </motion.div>
    </main>
  );
}

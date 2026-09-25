"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { nature, royal } from "@/lib/fonts";

export default function AboutHero() {
  const t = useTranslations("AboutPage");

  return (
    <section className="w-full pt-32 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-2 rounded-full bg-pakistan-green text-cornsilk flex items-center justify-center mx-auto mb-6 text-xl font-semibold"
        >
          PREX
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${royal.className} text-accent text-2xl`}
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${nature.className} text-foreground text-4xl md:text-6xl mt-3`}
        >
          {t("greeting")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-base md:text-lg mt-5 max-w-xl mx-auto"
        >
          {t("intro")}
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { nature, royal } from "@/lib/fonts";

export default function AboutStory() {
  const t = useTranslations("AboutPage");

  return (
    <section className="w-full py-20 bg-card">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
        >
          <Image
            src="/photos/hero-bg.jpg"
            alt="A quiet forest scene"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={`${royal.className} text-accent text-2xl`}>
            {t("whyLabel")}
          </span>
          <h2 className={`${nature.className} text-foreground text-3xl md:text-4xl mt-3 mb-5`}>
            {t("whyTitle")}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            {t("whyDesc1")}
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            {t("whyDesc2")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

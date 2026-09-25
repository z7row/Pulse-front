"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section className="relative overflow-hidden px-6 py-32 sm:px-10 lg:px-20 bg-card">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-4xl bg-dark-moss px-8 py-20 text-center sm:px-16 sm:py-28"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-light-moss/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-pakistan-green/60 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="text-xs uppercase tracking-[0.4em] text-cornsilk/60">
              {t("label")}
            </span>

            <h2 className="mt-7 text-5xl font-bold leading-none tracking-tighter text-cornsilk sm:text-7xl">
              {t("titlePart1")}
              <br />
              {t("titlePart2")}
            </h2>

            <p className="mx-auto mt-7 max-w-lg leading-7 text-cornsilk/65">
              {t("description")}
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-cornsilk px-7 py-3 text-sm font-medium text-pakistan-green transition-transform duration-300 hover:-translate-y-1"
              >
                {t("getInTouch")}
              </Link>

              <Link
                href="/blog"
                className="rounded-full border border-cornsilk/25 px-7 py-3 text-sm font-medium text-cornsilk transition-all hover:bg-cornsilk/10"
              >
                {t("exploreStories")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

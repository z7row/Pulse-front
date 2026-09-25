"use client";

import { motion } from "framer-motion";
import { Leaf, Wind, BookOpenText, Ban } from "lucide-react";
import { useTranslations } from "next-intl";
import { nature, royal } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

const reveal = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
} as const;

const images = {
  forest: "/photos/hero-bg.jpg",
  tropical: "/photos/gallery/canopy.jpg",
  macro: "/photos/gallery/fog-trail.jpg",
  firefly: "/photos/gallery/moss.jpg",
  nature: "/photos/gallery/river-bend.jpg",
  thinking: "/photos/journal/forest-patience.jpg",
  collection: "/photos/ss.jpeg",
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export default function Features() {
  const t = useTranslations("Features");

  const features = [
    {
      icon: Ban,
      title: t("items.zeroDistractions.title"),
      text: t("items.zeroDistractions.text"),
    },
    {
      icon: Leaf,
      title: t("items.natureThemes.title"),
      text: t("items.natureThemes.text"),
    },
    {
      icon: Wind,
      title: t("items.mindfulPacing.title"),
      text: t("items.mindfulPacing.text"),
    },
    {
      icon: BookOpenText,
      title: t("items.curated.title"),
      text: t("items.curated.text"),
    },
  ];

  const cards = [
    {
      title: t("cards.slowLiving.title"),
      text: t("cards.slowLiving.text"),
      image: images.tropical,
    },
    {
      title: t("cards.intoNature.title"),
      text: t("cards.intoNature.text"),
      image: images.nature,
    },
    {
      title: t("cards.quietMinds.title"),
      text: t("cards.quietMinds.text"),
      image: images.macro,
    },
  ];

  return (
    <section className="relative w-full py-28 md:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <span className={`${royal.className} text-accent text-2xl`}>
            {t("label")}
          </span>
          <h2 className={`${nature.className} text-foreground text-4xl md:text-5xl mt-3`}>
            {t("title")}
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group rounded-2xl bg-secondary/60 border border-border p-7 h-full"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-accent/35">
                <Icon className="w-5 h-5 text-accent" strokeWidth={1.6} />
              </div>
              <h3 className="text-foreground text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <section className="px-6 py-32 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-[0.35em] text-dark-moss">
                {t("fromJournal")}
              </span>

              <h2 className="mt-5 text-5xl font-bold tracking-tighter sm:text-7xl">
                {t("storiesHeadlinePart1")}
                <br />
                <span className="text-dark-moss">{t("storiesHeadlinePart2")}</span>
              </h2>
            </motion.div>

            <Link
              href="/blog"
              className="text-sm underline-offset-8 hover:underline"
            >
              {t("viewAll")} ↗
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-16 grid gap-6 md:grid-cols-3"
          >
            {cards.map((c, index) => (
              <motion.article
                key={c.title}
                variants={reveal}
                className={`${index === 1 ? "md:mt-16" : ""}`}
              >
                <div className="group relative aspect-4/5 overflow-hidden rounded-[1.75rem]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    priority
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <span className="text-xs uppercase tracking-[0.25em] text-white/60">
                      {t("journalTag")}
                    </span>

                    <h3 className="mt-3 text-3xl font-bold tracking-tight">
                      {c.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {c.text}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </section>
  );
}

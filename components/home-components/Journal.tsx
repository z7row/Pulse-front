"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { nature, royal } from "@/lib/fonts";

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

export default function Journal() {
  const t = useTranslations("Journal");

  const posts = [
    {
      tag: t("posts.oneThing.tag"),
      title: t("posts.oneThing.title"),
      excerpt: t("posts.oneThing.excerpt"),
      readTime: t("posts.oneThing.readTime"),
      image: "/photos/journal/one-thing.jpg",
    },
    {
      tag: t("posts.forestPatience.tag"),
      title: t("posts.forestPatience.title"),
      excerpt: t("posts.forestPatience.excerpt"),
      readTime: t("posts.forestPatience.readTime"),
      image: "/photos/journal/forest-patience.jpg",
    },
    {
      tag: t("posts.screensOff.tag"),
      title: t("posts.screensOff.title"),
      excerpt: t("posts.screensOff.excerpt"),
      readTime: t("posts.screensOff.readTime"),
      image: "/photos/journal/screens-off.jpg",
    },
  ];

  return (
    <section className="relative w-full py-28 md:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className={`${royal.className} text-accent text-2xl`}>
              {t("label")}
            </span>
            <h2 className={`${nature.className} text-foreground text-4xl md:text-5xl mt-3`}>
              {t("title")}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground text-sm font-medium border-b border-transparent hover:border-accent transition-all w-fit"
          >
            {t("readFull")} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.article
              key={post.title}
              variants={card}
              animate={{ rotate: 0, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group hover:border-accent rounded-2xl overflow-hidden bg-secondary/50 border border-border flex flex-col"
            >
              <div className="relative w-full aspect-4/3 overflow-hidden">
                <motion.div
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
                <span className="absolute top-4 left-4 bg-pakistan-green/80 text-cornsilk text-xs px-3 py-1 rounded-full tracking-wide">
                  {post.tag}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-foreground text-lg font-semibold leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <span className="text-accent text-xs mt-4 tracking-wide">
                  {post.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

const images = {
  forest: "/photos/gallery/moss.jpg",
};

export default function Escape() {
  const t = useTranslations("Escape");
  const escapeRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: escapeRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section
      ref={escapeRef}
      className="relative min-h-[80vh] overflow-hidden px-6 py-24 sm:px-10 lg:px-20 m-20 rounded-4xl"
    >
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-[-8%]"
      >
        <Image
          src={images.forest}
          alt="Quiet forest"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/35" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex min-h-[65vh] items-center justify-center text-center"
      >
        <div className="max-w-4xl">
          <span className="text-xs uppercase tracking-[0.4em] text-white/70">
            {t("label")}
          </span>

          <h2 className="mt-8 text-6xl font-bold leading-[0.9] tracking-[-0.06em] text-cornsilk sm:text-8xl lg:text-[10rem]">
            {t("title")}
          </h2>

          <p className="mx-auto mt-10 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            {t("description")}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

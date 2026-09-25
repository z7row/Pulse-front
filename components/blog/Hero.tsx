"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { reveal, stagger } from "@/lib/animations";
import { Dispatch, SetStateAction } from "react";

interface HeroProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

function Hero({ search, setSearch }: HeroProps) {
  const t = useTranslations("Blog.hero");

  return (
    <section className="relative px-6 pb-28 pt-40 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative">
          <motion.div
            variants={reveal}
            className="absolute -left-3 top-0 hidden text-[#606C38] lg:block"
          >
            <span className="text-8xl">⌁</span>
          </motion.div>

          <motion.div variants={reveal} className="max-w-6xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#DDA15E]">
              {t("eyebrow")}
            </span>

            <h1 className="mt-7 text-[15vw] font-bold leading-[0.78] tracking-[-0.075em] sm:text-8xl lg:text-[9.5rem]">
              {t("titleLine1")}
              <br />
              <span className="text-[#606C38]">{t("titleLine2")}</span>
              <br />
              {t("titleLine3")}
            </h1>
          </motion.div>

          <motion.div variants={reveal} className="mt-12 flex items-center justify-between gap-6">
            <p className="max-w-md text-sm leading-7 text-[#FEFAE0]/45">
              {t("description")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

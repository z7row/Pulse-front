"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nature, roboto, royal } from "@/lib/fonts";

const words = ["Breathe", "Relax", "Explore"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) return;
    const timer = setInterval(() => setIndex((i) => i + 1), 1600);
    return () => clearInterval(timer);
  }, [index]);

  const currentWord = words[index];

  const pullupVariant = {
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { y: -24, opacity: 0, transition: { duration: 0.3 } },
  }as const;

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <Image
        src="/photos/hero-bg.jpg"
        alt="Misty forest at dawn"
        fill
        priority
        className="object-cover -z-10"
      />
      {/* Bottom gradient so the subtext and CTA stay legible over the photo */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-black/30 -z-10" />

      <div className="flex flex-col items-center text-center px-6">
        {/* Eyebrow badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${royal.className} text-white/80 text-2xl mb-4`}
        >
          A Digital Space for Slow Living
        </motion.span>

        {/* Headline with the cycling word */}
        <div className="flex items-baseline justify-center gap-2">
          <div className="flex items-baseline">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentWord}
                variants={pullupVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`text-white text-6xl sm:text-8xl font-bold tracking-tighter ${roboto.className}`}
              >
                {currentWord}
              </motion.h1>
            </AnimatePresence>
          </div>
          <span className={`text-white text-6xl sm:text-8xl font-bold tracking-tighter ${roboto.className}`}>
            
          </span>
        </div>

        <p className="text-white/70 max-w-md mt-5 text-base sm:text-lg">
          Long-form stories about nature and stillness, written to be read
          slowly — no ads, no noise, just the page.
        </p>

        <Button
          className="mt-8 h-12 px-8 rounded-full bg-cornsilk text-pakistan-green hover:bg-white transition-all"
        >
          Start Reading
        </Button>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
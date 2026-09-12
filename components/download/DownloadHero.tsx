"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { nature, royal } from "@/lib/fonts";

// A slim photo band instead of a full-bleed hero or a plain glow blob —
// keeps this page visually distinct from both the homepage hero and a
// generic SaaS "download" page.
export default function DownloadHero() {
  return (
    <section className="relative w-full pb-16 bg-background overflow-hidden">
      <div className="relative w-full h-40 md:h-52 mb-14">
        <Image
          src="/photos/hero-bg.jpg"
          alt="Misty forest"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pakistan-green/10 via-pakistan-green/50 to-background" />
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center -mt-24 relative">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${royal.className} text-light-moss text-xl md:text-2xl block mb-2`}
        >
          Cross-Platform Experience
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${nature.className} text-cornsilk text-4xl md:text-6xl mb-5`}
        >
          Download Pulse
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-cornsilk/70 text-base md:text-lg"
        >
          Take your quiet reading space anywhere. Choose your platform below
          to get started.
        </motion.p>
      </div>
    </section>
  );
}

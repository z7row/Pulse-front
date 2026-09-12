"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { nature, royal } from "@/lib/fonts";

export default function AboutStory() {
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
          <span className={`${royal.className} text-accent text-2xl`}>Why Pulse</span>
          <h2 className={`${nature.className} text-foreground text-3xl md:text-4xl mt-3 mb-5`}>
            Built out of a simple frustration
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Most of the internet is built to keep you scrolling. Pulse started
            as the opposite idea — a place to actually finish reading
            something, without ads fighting for your attention or an
            algorithm deciding what's next.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            I designed and built every part of it — from the reading
            experience down to the editor writers use to publish — the way
            I'd want to use it myself.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

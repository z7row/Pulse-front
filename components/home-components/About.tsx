"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { nature, royal } from "@/lib/fonts";
import Link from "next/link";

// Section-level scroll reveal: elements fade + rise together, staggered by 0.15s
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
} as const;
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

// Image reveals with a clip-path wipe instead of a plain fade — reads more deliberate
const imageReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export default function About() {

  const images = {
  collection: "/photos/ss.jpeg",
};
  return (
    <section className="relative w-full pt-28 md:pt-36 space-y-32 overflow-hidden bg-card">
      {/* Editorial Introduction */}
      <section className="relative px-6 pb-32 mb-32 sm:px-10 lg:px-20 ">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <motion.div variants={reveal}>
              <span className="mb-6 block text-xs uppercase tracking-[0.35em] text-dark-moss">
                The Pulse Journal
              </span>

              <h2 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-tighterm:text-7xl lg:text-8xl">
                A quieter place
                <br />
                <span className="text-dark-moss">to be.</span>
              </h2>
            </motion.div>

            <motion.div
              variants={reveal}
              className="max-w-md lg:pb-3"
            >
              <p className="text-base leading-7 text-foreground/65 sm:text-lg">
                Pulse is a digital magazine for people who want to step away
                from the noise and reconnect with nature, thoughtful ideas,
                and themselves.
              </p>

              <Link
                href="/blog"
                className="mt-8 inline-flex items-center gap-3 border-b border-foreground/30 pb-2 text-sm font-medium transition-all hover:border-foreground"
              >
                Explore the journal
                <span>↗</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>



      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-20 items-center"
      >
        {/* Text column */}
        <div>
          <motion.span
            variants={fadeUp}
            className={`${royal.className} text-accent text-2xl tracking-wide`}
          >
            The Pulse Philosophy
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className={`${nature.className} text-foreground text-4xl md:text-5xl leading-tight mt-4 mb-6`}
          >
            A quiet place to
            <br />
            step outside the noise.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md"
          >
            Pulse is a digital magazine built for slow reading. No pop-ups,
            no autoplay, no endless feed — just long-form stories about
            nature, stillness, and the small rituals that bring you back to
            yourself. Every page is paced like a walk through the woods:
            unhurried, and worth the time.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md mt-4"
          >
            Open it when the day feels loud. Close it feeling like you
            actually breathed.
          </motion.p>
        </div>

        {/* Image column */}
        <motion.div
          variants={imageReveal}
          className="relative w-full aspect-5/5 rounded-2xl overflow-hidden"
        >
          <Image
            src="/photos/ss.jpeg"
            alt="Misty forest canopy at dawn"
            fill
            priority
            // sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-pakistan-green/40 via-transparent to-transparent" />
        </motion.div>
      </motion.div>



      {/* About The Journal */}
      <section className="px-6 pt-20  sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 250 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative min-h-125 overflow-hidden rounded-4xl"
          >
            <Image
              src={images.collection}
              alt="Nature"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

            <div className="absolute bottom-8 left-8">
              <span className="text-xs uppercase tracking-[0.3em] text-white/70">
                Digital Mindfulness
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 180 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-between rounded-4xl
             bg-cornsilk p-8 text-pakistan-green sm:p-12"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-dark-moss">
                About Pulse
              </span>

              <h2 className="mt-8 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                Read less.
                <br />
                Feel more.
              </h2>
            </div>

            <div className="mt-16 max-w-lg">
              <p className="leading-7 text-pakistan-green/65">
                We believe the internet can be a place for stillness too.
                Pulse brings together stories, photography and ideas around
                nature and slow living without unnecessary noise.
              </p>

              <p className="mt-5 leading-7 text-pakistan-green/65">
                Every piece is created to give you a few quiet minutes away
                from the constant rhythm of the digital world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      
    </section>
  );
}

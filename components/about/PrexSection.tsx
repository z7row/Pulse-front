"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Fish } from "lucide-react";
import { nature, royal } from "@/lib/fonts";

export default function PrexSection() {
  return (
    <section className="w-full py-24 bg-pakistan-green text-cornsilk">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto px-6 text-center"
      >
        <span className={`${royal.className} text-light-moss text-2xl`}>A PREX Product</span>
        <h2 className={`${nature.className} text-3xl md:text-4xl mt-3 mb-5`}>
          Made under PREX
        </h2>
        <p className="text-cornsilk/70 text-base leading-relaxed mb-10">
          Pulse is built and maintained by PREX, a software agency I run
          focused on crafting digital products for the Egyptian market.
          Pulse is one of ours — start to finish.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="https://prex-sand.vercel.app/ar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-cornsilk text-pakistan-green text-sm font-medium hover:bg-white transition-colors"
          >
            Visit PREX <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61590957732130"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-cornsilk/30 text-cornsilk text-sm font-medium hover:bg-cornsilk/10 transition-colors"
          >
            <Fish   className="w-4 h-4" /> Follow on Facebook
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

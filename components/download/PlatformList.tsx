"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Terminal, ArrowUpRight, Clock } from "lucide-react";

const platforms = [
  {
    name: "Windows",
    desc: "For Windows 10 & 11 (64-bit)",
    icon: Monitor,
    badge: "Coming Soon",
  },
  {
    name: "Linux",
    desc: "AppImage & Debian Package",
    icon: Terminal,
    badge: "Coming Soon",
  },
  {
    name: "Android",
    desc: "APK & Google Play Store",
    icon: Smartphone,
    badge: "Coming Soon",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}as const;

const row = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}as const;

// A stacked list of full-width rows instead of equal-width cards — reads
// more like an editorial index than a generic SaaS pricing/download grid.
export default function PlatformList() {
  return (
    <section className="w-full pb-20 bg-background">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-2xl mx-auto px-6 divide-y divide-border border-t border-b border-border"
      >
        {platforms.map(({ name, desc, icon: Icon, badge }) => (
          <motion.div
            key={name}
            variants={row}
            className="group relative flex items-center gap-5 py-6 overflow-hidden"
          >
            {/* Background tint that slides in from the left on hover */}
            <motion.div
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-secondary/40 -z-10"
            />

            <div className="w-12 h-12 shrink-0 rounded-full bg-pakistan-green/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-pakistan-green" strokeWidth={1.6} />
            </div>

            <div className="flex-1">
              <h3 className="text-foreground text-lg font-semibold">{name}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>

            {/* Small "in development" pulse instead of a static badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border">
              {/* <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span> */}
              {badge}
            </span>

            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex justify-center mt-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/40 border border-border text-xs text-muted-foreground text-center max-w-sm">
          These options will be available soon. Development is currently in progress.
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { nature, royal } from "@/lib/fonts";

// Rename/replace these with your own curated shots — keep filenames ASCII, no spaces.
const photos = [
  { src: "/photos/gallery/canopy.jpg", caption: "Canopy Light", span: "md:row-span-2" },
  { src: "/photos/gallery/fog-trail.jpg", caption: "Fog Trail", span: "" },
  { src: "/photos/gallery/moss.jpg", caption: "Moss & Stone", span: "" },
  { src: "/photos/gallery/river-bend.jpg", caption: "River Bend", span: "md:col-span-2" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}as const;

export default function Gallery() {
  return (
    <section className="relative w-full py-28 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <span className={`${royal.className} text-accent text-2xl`}>
            Moments of Stillness
          </span>
          <h2 className={`${nature.className} text-foreground text-4xl md:text-5xl mt-3`}>
            The world outside your window
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 auto-rows-55 gap-4"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.caption}
              variants={item}
              className={`relative rounded-xl overflow-hidden ${photo.span}`}
            >
              <motion.div
                className="relative w-full h-full"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    priority
                    // sizes="(max-width: " 
                    className="object-cover"
                  />
                </motion.div>

                {/* Overlay darkens and the caption slides up on hover — replaces a plain image-scale */}
                <motion.div
                  variants={{
                    rest: { opacity: 0.15 },
                    hover: { opacity: 0.55 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-pakistan-green"
                />
                <motion.div
                  variants={{
                    rest: { y: 16, opacity: 0 },
                    hover: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-0 p-5"
                >
                  <span className="text-cornsilk text-sm tracking-wide font-medium">
                    {photo.caption}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

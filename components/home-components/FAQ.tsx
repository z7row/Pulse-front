"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  const t = useTranslations("FAQ");

  const faqs = [
    {
      q: t("items.whatIsPulse.q"),
      a: t("items.whatIsPulse.a"),
    },
    {
      q: t("items.isFree.q"),
      a: t("items.isFree.a"),
    },
    {
      q: t("items.howOften.q"),
      a: t("items.howOften.a"),
    },
    {
      q: t("items.guestWriters.q"),
      a: t("items.guestWriters.a"),
    },
  ];

  return (
    <section className="bg-accent-foreground px-6 py-32 text-cornsilk sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs uppercase tracking-[0.35em] text-light-moss">
            {t("label")}
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tighter text-cornsilk sm:text-7xl">
            {t("titlePart1")}
            <br />
            <span className=" text-cornsilk">{t("titlePart2")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border-b border-cornsilk/15"
              >
                <AccordionTrigger className="py-7 text-left text-lg font-medium text-cornsilk/90 hover:text-cornsilk transition-all">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-7 leading-relaxed text-cornsilk/65">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

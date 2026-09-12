"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Pulse?",
    a: "Pulse is a digital magazine focused on nature, mindfulness, slow living and thoughtful digital experiences.",
  },
  {
    q: "Is Pulse free to read?",
    a: "Yes. Every story on Pulse is free, ad-free, and always will be. We're funded by readers who choose to support us directly, not by advertisers.",
  },
  {
    q: "How often do you publish new stories?",
    a: "A couple of times a week. We'd rather publish one story worth your time than five that aren't.",
  },
  {
    q: "Do you accept guest writers?",
    a: "We do. If you write about nature, mindfulness, or slow living, reach out through the contact form below with a sample of your work.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-accent-foreground px-6 py-32 text-cornsilk sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs uppercase tracking-[0.35em] text-light-moss">
            Questions
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tighter text-cornsilk sm:text-7xl">
            Things you
            <br />
            <span className=" text-cornsilk">might wonder.</span>
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
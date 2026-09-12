import Link from "next/link";
import Image from "next/image";
import { nature, royal } from "@/lib/fonts";

export interface LegalSection {
  id: string;
  heading: string;
  body: React.ReactNode;
}

interface LegalLayoutProps {
  title: string;
  eyebrow: string;
  lastUpdated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}

export default function LegalLayout({ title, eyebrow, lastUpdated, intro, sections }: LegalLayoutProps) {
  return (
    <main className="w-full pt-28 pb-28 bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-10 grid md:grid-cols-[200px_1fr] gap-12">
        {/* Table of contents — sticky, desktop only */}
        <nav className="hidden md:block sticky top-28 self-start">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Image src="/photos/logo/logo.png" alt="Pulse" width={24} height={24} className="rounded-full" />
            <span className={`${nature.className} text-foreground text-base`}>Pulse</span>
          </Link>
          <ul className="space-y-3 border-l border-border pl-4">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors leading-snug"
                >
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Document */}
        <article className="max-w-2xl">
          <span className={`${royal.className} text-accent text-xl`}>{eyebrow}</span>
          <h1 className={`${nature.className} text-foreground text-4xl md:text-5xl mt-2 mb-3`}>
            {title}
          </h1>
          <p className="text-xs text-muted-foreground mb-10">Last updated {lastUpdated}</p>

          <div className="text-muted-foreground text-sm leading-relaxed mb-12">{intro}</div>

          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-foreground text-xl font-semibold mb-3">{s.heading}</h2>
                <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
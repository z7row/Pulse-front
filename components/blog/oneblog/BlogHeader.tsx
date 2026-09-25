import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function BlogHeader() {
  const t = useTranslations("Blog.header");

  return (
    <header className="border-b border-border/50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/photos/logo/logo-bg-up.jpg"
            alt="Logo"
            width={42}
            height={42}
            className="rounded-full object-cover"
          />

          <span className="text-lg font-medium tracking-tight">
            {t("journal")}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t("home")}
          </Link>

          <Link href="/blog" className="text-foreground">
            {t("blog")}
          </Link>

          <Link href="/about" className="transition-colors hover:text-foreground">
            {t("about")}
          </Link>
        </nav>
      </div>
    </header>
  );
}

import { useTranslations } from "next-intl";
import { nature } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const t = useTranslations("Footer");

  return (
    <div className="border-t border-cornsilk/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between gap-10">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/photos/logo/logo.png"
              alt="Pulse"
              width={32}
              priority
              height={32}
              className="rounded-full"
            />
            <span className={`${nature.className} text-xl`}>Pulse</span>
          </div>
          <p className="text-cornsilk/60 text-sm leading-relaxed">
            {t("tagline")}
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <div>
            <h4 className="text-sm font-semibold mb-3 text-cornsilk/90">
              {t("explore")}
            </h4>
            <ul className="space-y-2 text-sm text-cornsilk/60">
              <li><Link href="/" className="hover:text-cornsilk transition-all">{t("home")}</Link></li>
              <li><Link href="/blog" className="hover:text-cornsilk transition-all">{t("blogs")}</Link></li>
              <li><Link href="/download" className="hover:text-cornsilk transition-all">{t("download")}</Link></li>
              <li><Link href="/about" className="hover:text-cornsilk transition-all">{t("about")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-cornsilk/90">
              {t("follow")}
            </h4>
            <div className="flex gap-4">
              <a href="https://google.com" aria-label="Instagram" className="text-cornsilk/60 hover:text-cornsilk transition-all">
                google
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590957732130" aria-label="Facebook" className="text-cornsilk/60 hover:text-cornsilk transition-all">
                facebook
              </a>
              <a href="https://prex-sand.vercel.app/ar" aria-label="PREX" className="text-cornsilk/60 hover:text-cornsilk transition-all">
                PREX
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-cornsilk/40 my-4">
        {t("termsPrefix")}{" "}
        <Link href="/terms" className="underline hover:text-foreground transition-colors">
          {t("terms")}
        </Link>{" "}
        {t("and")}{" "}
        <Link href="/privacy" className="underline hover:text-foreground transition-colors">
          {t("privacy")}
        </Link>
        .
      </p>

      <div className="text-center text-xs text-cornsilk/40 pb-1">
        © {new Date().getFullYear()} Pulse {t("rights")}
      </div>
      <div className="text-center text-sm text-cornsilk/80 pb-8 font-bold">
        {t("poweredBy")}{" "}
        <a href="https://prex-sand.vercel.app/ar" aria-label="PREX" className="text-cornsilk hover:underline hover:text-cornsilk transition-all font-black">
          PREX
        </a>
      </div>
    </div>
  );
}

export default Footer;

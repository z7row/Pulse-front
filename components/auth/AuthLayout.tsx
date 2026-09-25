import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { nature, royal } from "@/lib/fonts";

interface AuthLayoutProps {
  children: React.ReactNode;
  image?: string;
  tagline?: string;
  taglineDetail?: string;
}

export default function AuthLayout({
  children,
  image = "/photos/hero-bg.jpg",
  tagline,
  taglineDetail,
}: AuthLayoutProps) {
  const t = useTranslations("Auth.layout");
  const resolvedTagline = tagline ?? t("tagline");
  const resolvedDetail = taglineDetail ?? t("taglineDetail");

  return (
    <div className="h-screen w-full flex bg-background">
      {/* Form side */}
      <div className="w-full lg:w-112.5 shrink-0 flex flex-col justify-center px-8 sm:px-14 py-16">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Image src="/photos/logo/logo.png" alt="Pulse" width={32} height={32} className="rounded-full" />
          <span className={`${nature.className} text-foreground text-xl`}>Pulse</span>
        </Link>

        {children}
      </div>

      {/* Photo side — hidden on small screens */}
      <div className="hidden lg:block relative flex-1">
        <Image src={image} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-pakistan-green/70 via-pakistan-green/10 to-transparent" />
        <div className="absolute bottom-14 left-14 right-14 max-w-md">
          <span className={`${royal.className} text-light-moss text-2xl`}>Pulse</span>
          <h2 className={`${nature.className} text-cornsilk text-3xl mt-2 mb-3 leading-snug`}>
            {resolvedTagline}
          </h2>
          <p className="text-cornsilk/70 text-sm leading-relaxed">{resolvedDetail}</p>
        </div>
      </div>
    </div>
  );
}

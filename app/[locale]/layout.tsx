import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import HideLayout from "./hide_nav_footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

import {routing} from '../../i18n/routing';
import { notFound } from "next/navigation";
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
export const metadata: Metadata = {
  title: "Pulse",
  description: "Nature place to explore and have power",
  verification: {
    google: 'xQ0qFuqaxktVcgmatCzid577SN0xdNw5RVDtMjt6TtE',
  },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default async function RootLayout({ children,
  params }: { children: React.ReactNode ;params: Promise<{locale: string}>;}) {

  const headerList = await headers();
  const hideNavbar = headerList.get('x-hide-navbar') === 'true';
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html
     lang={locale} dir={dir}
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col static">
<NextIntlClientProvider messages={messages}>
          <HideLayout>

          {children}
        </HideLayout>
        </NextIntlClientProvider>
        
      </body>
    </html>
  );
}

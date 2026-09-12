import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import HideLayout from "./hide_nav_footer";
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



export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const headerList = await headers();
  const hideNavbar = headerList.get('x-hide-navbar') === 'true';
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col static">

        <HideLayout>

          {children}
        </HideLayout>
      </body>
    </html>
  );
}

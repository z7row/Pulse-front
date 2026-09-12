"use client";

import { usePathname } from "next/navigation";
import Nav from "./components/nav";
import Footer from "./components/footer";

export default function HideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hiddenRoutes = ["/auth", "/blog"];

  const hideLayout = hiddenRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {!hideLayout && <Nav />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
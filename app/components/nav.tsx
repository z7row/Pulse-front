"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/profile.st";
import { Getcoockies } from "@/lib/getcookies";

export default function Nav() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<profile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const data = await Getcoockies();
      if (data) {
        setUserProfile(data.data);
      }
      setLoading(false);
    }
    loadProfile();
  }, []);
// console.log(userProfile, "dataaaaaaaaaaaaaaaaaaaaaaaaaa")
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blog" },
    { name: "Download", href: "/download" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-center px-2">
      <nav className="flex h-14 w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-2 backdrop-blur-md transition-all duration-300 md:px-2">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/photos/logo/logo.png"
            alt="Pulse"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-lg font-bold text-white sm:text-xl">
            Pulse
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center">
          <ul className="flex items-center gap-6 text-sm text-white lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-opacity hover:opacity-75"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Profile / Auth Action */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {!userProfile && !loading ? (
            <Button className="rounded-full px-5 py-2 text-xs font-semibold" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          ) : loading ? null : (
            <Link
              href="/profile/me"
              className="flex items-center gap-2.5 rounded-full bg-white/5 p-1 pl-3 transition-colors hover:bg-white/10"
            >
              <span className="max-w-25 truncate text-xs font-medium uppercase text-[#FEFAE0]">
                {userProfile?.name}
              </span>
              <div className="relative size-8 shrink-0">
                <Image
                  alt={userProfile?.name || "User Avatar"}
                  height={100}
                  width={100}
                  className="size-8 rounded-full border border-[#FEFAE0]/15 object-cover"
                  src={userProfile?.profilephoto || "/photos/logo/logo-bg-up.jpg"}
                />
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-1.5 text-white transition-opacity hover:opacity-70 md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#08140A]/95 p-6 backdrop-blur-xl transition-all duration-300 md:hidden">
          <ul className="flex flex-col gap-4 text-center text-sm font-medium text-white">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 transition-opacity hover:opacity-70"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-2 border-t border-white/10 pt-4 flex justify-center">
            {!userProfile && !loading ? (
              <Button className="w-full rounded-full py-2.5 text-xs font-semibold" asChild>
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
            ) : loading ? null : (
              <Link
                href="/profile/me"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-full bg-white/5 pr-4 px-2 py-2"
              >
                <Image
                  alt={userProfile?.name || "User Avatar"}
                  height={100}
                  width={100}
                  className="size-9 rounded-full border border-[#FEFAE0]/15 object-cover"
                  src={userProfile?.profilephoto || "/photos/logo/logo-bg-up.jpg"}
                />
                <span className="text-sm font-medium uppercase text-[#FEFAE0]">
                  {userProfile?.name}
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
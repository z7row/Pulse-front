"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import {
  ChevronsUpDown,
  CircleUserRound,
  LogIn,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  SquareLibrary,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getmeProfile } from "@/lib/api/myprofile";
import { profile } from "@/lib/profile.st";
import { Button } from "../ui/button";
import { TooltipProvider } from "../ui/tooltip";

function BlogSideBar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("Auth.sideBar");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [user, setUser] = useState<profile | null>(null);
  const accessToken = Cookies.get("access_token");

  const links = [{ title: t("blogLink"), url: "/blog", icon: <SquareLibrary /> }];

  useEffect(() => {
    if (!accessToken) {
      setUser(null);
      return;
    }

    getmeProfile()
      .then((res: any) => {
        const userData = res?.data || res;
        setUser(userData);
      })
      .catch(() => setUser(null));
  }, [accessToken]);

  const handleLogout = () => {
    Cookies.remove("access_token");
    window.location.reload();
  };

  return (
    <TooltipProvider>
      <motion.aside
        animate={{ width: collapsed ? 70 : 256 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="relative flex h-full flex-col justify-between border-r border-border bg-card px-3 py-4"
      >
        <button
          type="button"
          aria-label={collapsed ? t("openSidebar") : t("collapseSidebar")}
          onClick={onToggle}
          className="absolute -right-3 top-12 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-lg transition hover:text-foreground"
        >
          <motion.span
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-4" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
          </motion.span>
        </button>

        <div className="flex items-center justify-start gap-2">
          <Link href="/" className="flex h-fit cursor-pointer items-center overflow-hidden">
            <Image
              src="/photos/logo/logo.png"
              alt="Pulse"
              width={40}
              height={40}
              className="rounded-full"
            />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.h1
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2 overflow-hidden text-xl font-bold text-white"
                >
                  Pulse
                </motion.h1>
              )}
            </AnimatePresence>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-2 my-4 mt-8">
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="flex items-center gap-3 bg-secondary/60 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <span className="shrink-0">{link.icon}</span>
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap text-sm font-medium"
                  >
                    {link.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {accessToken ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex w-full items-center gap-3 rounded-full border border-border p-1 text-left transition-all duration-200 hover:bg-secondary ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <div className="relative size-9 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={user?.profilephoto || "/photos/logo/logo-bg-up.jpg"}
                    alt={user?.name || "Profile"}
                    fill
                    className="object-cover"
                  />
                </div>

                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0 truncate text-sm font-medium text-cornsilk"
                    >
                      {user?.name || "Undefined"}
                    </motion.span>
                  )}
                </AnimatePresence>

                {!collapsed && (
                  <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="top" align="end" className="w-56">
              <DropdownMenuItem
                variant="destructive"
                className="rounded-full"
                onSelect={() => setConfirmOpen(true)}
              >
                <LogOut className="size-4" />
                {t("logout")}
              </DropdownMenuItem>
              <Link href="/profile/me">
                <DropdownMenuItem className="rounded-full hover:text-white">
                  <CircleUserRound className="size-4" />
                  {t("profile")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className={`rounded-full transition-all duration-200 ${
              collapsed ? "h-12 w-12 p-0" : "px-6"
            }`}
            asChild
          >
            <Link href="/auth/login" className={collapsed ? "justify-center" : ""}>
              {collapsed ? <LogIn className="size-4" /> : t("login")}
            </Link>
          </Button>
        )}

        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("logoutTitle")}</AlertDialogTitle>
              <AlertDialogDescription>{t("logoutDesc")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>{t("logout")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.aside>
    </TooltipProvider>
  );
}

export default BlogSideBar;

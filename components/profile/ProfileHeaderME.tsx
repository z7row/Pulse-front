"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { profile } from "@/lib/profile.st";
import { ProfileHeaderSkeleton } from "./ProfileSkeleton";

export default function ProfileHeaderME({ user }: { user: profile | null }) {
  const t = useTranslations("Profile.header");

  if (!user) return <ProfileHeaderSkeleton />;

  return (
    <section className="relative">
      {/* Cover */}
      <div className="h-56 overflow-hidden rounded-4xl border border-border/50 bg-muted sm:h-72">
        <Image
          src={user?.banner || "/photos/hero-bg.jpg"}
          alt="Cover"
          width={1600}
          height={600}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b rounded-4xl from-black/30 to-transparent" />
      </div>

      {/* Profile */}
      <div className="relative -mt-18 px-5 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <div className="overflow-hidden rounded-full border bg-background">
              <Image
                src={user?.profilephoto || "/photos/logo/logo-bg-up.jpg"}
                alt={user?.name || "Profile"}
                width={150}
                height={150}
                className="h-32 w-32 object-cover sm:h-36 sm:w-36"
              />
            </div>

            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight">
                  {user?.name || "undefined"}
                </h1>

                {user?.goal ? (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-xs text-primary-foreground">
                    {user?.goal}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <p className="h-14 text-muted-foreground">{user?.pio || ""}</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-fit gap-2"
            onClick={() => {
              window.location.href = "/profile/me/edit";
            }}
          >
            <Settings className="size-4" />
            {t("editProfile")}
          </Button>
        </div>
      </div>
    </section>
  );
}

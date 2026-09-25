"use client";

import { useRef, ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerUploadProps {
  bannerPreview: string | null;
  currentBanner?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function BannerUpload({ bannerPreview, currentBanner, onChange }: BannerUploadProps) {
  const t = useTranslations("Blog.editor");
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />

      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-4 right-4 z-10 flex cursor-pointer items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-xs font-medium backdrop-blur-sm transition hover:bg-background"
      >
        <Camera className="size-4" />
        <span>
          {bannerPreview || currentBanner ? t("changeCover") : t("uploadCover")}
        </span>
      </Button>
    </>
  );
}

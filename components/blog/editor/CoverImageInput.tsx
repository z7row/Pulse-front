"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ImagePlus, X } from "lucide-react";

interface CoverImageInputProps {
  onFileSelected: (file: File | null) => void;
  initialImageUrl?: string | null;
  onRemoveExisting?: () => void;
}

export default function CoverImageInput({
  onFileSelected,
  initialImageUrl = null,
  onRemoveExisting,
}: CoverImageInputProps) {
  const t = useTranslations("Blog.editor");
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialImageUrl);
  const [isExisting, setIsExisting] = useState(Boolean(initialImageUrl));

  useEffect(() => {
    setPreview(initialImageUrl);
    setIsExisting(Boolean(initialImageUrl));
  }, [initialImageUrl]);

  function handleFile(file: File | null) {
    onFileSelected(file);
    if (!file) {
      setPreview(null);
      setIsExisting(false);
      return;
    }
    setIsExisting(false);
    setPreview(URL.createObjectURL(file));
  }

  function handleRemove() {
    if (isExisting) onRemoveExisting?.();
    handleFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      {preview ? (
        <div className="relative w-full aspect-21/9 rounded-xl overflow-hidden group">
          <Image src={preview} alt={t("coverPreview")} fill className="object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label={t("removeCover")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-21/9 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-accent hover:text-accent transition-colors"
        >
          <ImagePlus className="w-6 h-6" />
          <span className="text-sm">{t("addCover")}</span>
        </button>
      )}
    </div>
  );
}

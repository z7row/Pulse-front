"use client";

import { useState, useRef, useEffect, memo } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export const Selectcomponent = memo(function Selectcomponent({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const t = useTranslations("Blog.select");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="text-xs text-muted-foreground block mb-1.5 font-medium">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-44 h-10 px-4 rounded-full border border-border bg-background text-foreground text-sm flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-pointer hover:bg-secondary/40"
      >
        <span>{value || t("placeholder")}</span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 z-50 rounded-3xl border border-border bg-card/95 backdrop-blur-md p-1 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-100">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-3.5 py-1.5 my-0.5 rounded-2xl text-sm transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-accent/20 text-accent font-medium"
                    : "text-foreground/90 hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

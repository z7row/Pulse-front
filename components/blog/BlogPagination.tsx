"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number | ((p: number) => number)) => void;
}

export default function BlogPagination({
  page,
  totalPages,
  setPage,
}: BlogPaginationProps) {
  const t = useTranslations("Blog.pagination");

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        aria-label={t("prev")}
        className="flex size-9 sm:size-11 items-center justify-center rounded-full border border-[#FEFAE0]/10 transition hover:bg-[#283618] disabled:opacity-25"
      >
        <ChevronLeft className="size-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          aria-label={t("page", { number })}
          className={`flex size-9 sm:size-11 items-center justify-center rounded-full text-xs transition ${
            page === number
              ? "bg-[#606C38] text-[#FEFAE0]"
              : "text-[#FEFAE0]/45 hover:bg-[#102313]"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        aria-label={t("next")}
        className="flex size-9 sm:size-11 items-center justify-center rounded-full border border-[#FEFAE0]/10 transition hover:bg-[#283618] disabled:opacity-25"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

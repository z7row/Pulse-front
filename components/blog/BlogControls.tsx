"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { ease } from "@/lib/animations";

interface BlogControlsProps {
  filter: "all" | "blog" | "post";
  setFilter: (val: "all" | "blog" | "post") => void;
  search: string;
  setSearch: (val: string) => void;
  isMobile: boolean;
}

export default function BlogControls({
  filter,
  setFilter,
  search,
  setSearch,
  isMobile,
}: BlogControlsProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex w-full flex-col justify-between gap-6 border-b border-[#FEFAE0]/10 pb-6 sm:flex-row sm:items-end">
      <div>
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#DDA15E]">
          Fresh from the journal
        </span>
        <h2 className="mt-2 text-4xl font-bold tracking-tighter sm:text-6xl">
          Latest
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex w-fit rounded-full border border-[#FEFAE0]/10 h-10 bg-[#102313] p-1">
          {[
            { label: "All", value: "all" },
            { label: "Blogs", value: "blog" },
            { label: "Posts", value: "post" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value as "all" | "blog" | "post")}
              className="relative rounded-full px-3 sm:px-4 py-1 text-[10px] uppercase tracking-[0.12em]"
            >
              {filter === item.value && (
                <motion.span
                  layoutId="active-filter"
                  className="absolute inset-0 rounded-full bg-[#606C38]"
                  transition={{ duration: 0.5, ease }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="relative h-10">
          <AnimatePresence mode="wait">
            {!searchOpen ? (
              <motion.button
                key="search-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchOpen(true)}
                className="flex p-2.5 h-10 items-center justify-center rounded-full border border-[#FEFAE0]/10 bg-[#102313] text-[#FEFAE0]/70 transition-all hover:border-[#DDA15E]"
              >
                <Search className="size-5" />
              </motion.button>
            ) : (
              <motion.div
                key="search-input"
                initial={{ width: 48, opacity: 0 }}
                animate={{ width: isMobile ? 200 : 260, opacity: 1 }}
                exit={{ width: 48, opacity: 0 }}
                className="flex h-10 items-center gap-2 rounded-full border border-[#606C38]/40 bg-[#102313] px-4"
              >
                <Search className="size-4 shrink-0" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-xs sm:text-sm text-[#FEFAE0] outline-none placeholder:text-[#FEFAE0]/30"
                />
                <button
                  onClick={() => {
                    setSearch("");
                    setSearchOpen(false);
                  }}
                  className="text-[#FEFAE0]/40 hover:text-[#FEFAE0]"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
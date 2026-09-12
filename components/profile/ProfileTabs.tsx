"use client";

import { profile } from "@/lib/profile.st";
import { useState } from "react";
import { motion } from "framer-motion";
const tabs = ["Posts", "Comments"];

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  // const [active, setActive] = useState("Posts");

  return (
    <div className="mt-8 flex gap-8 w-full justify-center" >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative pb-2 text-sm translate-x-4 transition-colors ${
            activeTab === tab
              ? "font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.span
              layoutId="activeTab"
              transition={{ type: "spring", stiffness: 500, damping: 60 }}
              className="absolute inset-x-0 bottom-0 h-0.5 bg-primary rounded-full"
            />
          )}
        </button>
      ))}
    </div>
  );
}
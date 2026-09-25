"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  const t = useTranslations("Profile.tabs");

  const tabs = [
    { key: "Posts", label: t("posts") },
    { key: "Comments", label: t("comments") },
  ];

  return (
    <div className="mt-8 flex gap-8 w-full justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`relative pb-2 text-sm translate-x-4 transition-colors ${
            activeTab === tab.key
              ? "font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
          {activeTab === tab.key && (
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

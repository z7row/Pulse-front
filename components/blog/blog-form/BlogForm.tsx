"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface BlogFormData {
  title: string;
  content: string;
  type: "post" | "blog";
  category: string;
  author: string;
  logo: string;
  banner: string;
}

interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  mode?: "create" | "update";
  onSubmit?: (data: BlogFormData) => void;
}

const DEFAULT_DATA: BlogFormData = {
  title: "My First Blog",
  content: "Write your blog content here...",
  type: "blog",
  category: "Technology",
  author: "Zeyad",
  logo: "/photos/logo/logo-bg-up.jpg",
  banner: "/photos/hero-bg.jpg",
};

export default function BlogForm({
  initialData,
  mode = "create",
  onSubmit,
}: BlogFormProps) {
  const t = useTranslations("Blog.form");
  const [form, setForm] = useState<BlogFormData>({
    ...DEFAULT_DATA,
    ...initialData,
  });

  const updateField = <K extends keyof BlogFormData>(
    field: K,
    value: BlogFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t("titleLabel")}</label>
        <Input
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder={t("titlePlaceholder")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t("categoryLabel")}</label>
          <Input
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder={t("categoryPlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("typeLabel")}</label>
          <Select
            value={form.type}
            onValueChange={(value) =>
              updateField("type", value as "post" | "blog")
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blog">{t("typeBlog")}</SelectItem>
              <SelectItem value="post">{t("typePost")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t("authorLabel")}</label>
        <Input
          value={form.author}
          onChange={(e) => updateField("author", e.target.value)}
          placeholder={t("authorPlaceholder")}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t("contentLabel")}</label>
        <Textarea
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          placeholder={t("contentPlaceholder")}
          className="min-h-[350px] resize-y"
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        {mode === "update" ? t("update") : t("create")}
      </Button>
    </form>
  );
}

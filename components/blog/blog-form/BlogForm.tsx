"use client";

import { useState } from "react";
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
  const [form, setForm] = useState<BlogFormData>({
    ...DEFAULT_DATA,
    ...initialData,
  });

  const updateField = <K extends keyof BlogFormData>(
    field: K,
    value: BlogFormData[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>

        <Input
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Blog title"
        />
      </div>

      {/* Category + Type */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>

          <Input
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="Technology"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>

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
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="post">Post</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Author */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Author</label>

        <Input
          value={form.author}
          onChange={(e) => updateField("author", e.target.value)}
          placeholder="Author name"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>

        <Textarea
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          placeholder="Write your content..."
          className="min-h-[350px] resize-y"
        />
      </div>

      {/* Logo */}
      {/* <div className="space-y-2">
        <label className="text-sm font-medium">Logo URL</label>

        <Input
          value={form.logo}
          onChange={(e) => updateField("logo", e.target.value)}
          placeholder="/photos/logo/logo-bg-up.jpg"
        />
      </div> */}

      {/* Banner */}
      {/* <div className="space-y-2">
        <label className="text-sm font-medium">Banner URL</label>

        <Input
          value={form.banner}
          onChange={(e) => updateField("banner", e.target.value)}
          placeholder="/photos/hero-bg.jpg"
        />
      </div> */}

      {/* Submit */}
      <Button type="submit" className="w-full sm:w-auto">
        {mode === "update" ? "Update Blog" : "Create Blog"}
      </Button>
    </form>
  );
}
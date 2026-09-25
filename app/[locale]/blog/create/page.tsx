"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { nature } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import CoverImageInput from "@/components/blog/editor/CoverImageInput";
import MarkdownEditor from "@/components/blog/editor/MarkdownEditor";
import { Selectcomponent } from "@/components/blog/create/Select";

const categories = ["Sustainability", "Agriculture", "Climate", "Community"];


export default function NewBlogPage() {
  const router = useRouter();

  // ---------------------------------------------------------------------------
  // Component State Variables
  // ---------------------------------------------------------------------------
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [postType, setPostType] = useState<"blog" | "post">("blog");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState<"draft" | "publish" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [coverurl, setcoverurl] = useState("")
  useEffect(() => {
     const token = Cookies.get("access_token");

    // 1. Authentication Check
    if (!token) {
      router.push("/auth/login");
      return;
    }

  })
  // ---------------------------------------------------------------------------
  // Upload file to Cloudinary
  // ---------------------------------------------------------------------------
  async function uploadImageFile(file: File, token: string): Promise<string> {
    if(coverurl){
      return coverurl
    }
    const formData = new FormData();
    formData.append("file", file);
  // console.log("file", file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to upload cover image");
    }

    const data = await res.json();
    setcoverurl(data.url)
    return data.url;
  }


  // ---------------------------------------------------------------------------
  // Form Submission Handler
  // ---------------------------------------------------------------------------
  async function handleSubmit(mode:"publish") {
    setError(null);
    const token = Cookies.get("access_token");

    // 1. Authentication Check
    if (!token) {
      return;
    }

    // 2. Client-side Validation
    if (!title.trim()) {
      setError("Please give your post a title first.");
      return;
    }
    if (!content.trim()) {
      setError("The post needs content before you can publish.");
      return;
    }

    setSubmitting(mode);

    try {
      let bannerUrl: string | undefined = undefined;

      // 3. Step One: Upload Cover Image if selected
      if (coverFile) {
        bannerUrl = await uploadImageFile(coverFile, token);
      }
    // console.log(category, "catttttttttttt")
      // 4. Step Two: Construct payload strictly matching NestJS CreateBlogDto
      const payload = {
        title,
        content,
        category,
        type: postType,
        banner: bannerUrl,
      };
    // console.log(payload)
      // 5. Submit Blog Data to API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to create blog post");
      }

      // 6. Success Redirect
      router.push("/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <main className="w-full pt-28 pb-24 bg-card ">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className={`${nature.className} text-foreground text-4xl mb-8`}>
          Write a new story
        </h1>

        <div className="space-y-6">
          {/* Cover Image Uploader Component */}
          <CoverImageInput onFileSelected={setCoverFile} />

          {/* Title Input */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className={`${nature.className} w-full text-3xl bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none border-b border-border pb-3`}
          />

          {/* Category & Type Filters */}
          <div className="flex flex-wrap gap-4">
            <Selectcomponent label="Category" value={category} onChange={setCategory} options={categories} />

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Type</label>
              <div className="flex gap-2">
                <ToggleButton active={postType === "blog"} onClick={() => setPostType("blog")}>
                  Long Read
                </ToggleButton>
                <ToggleButton active={postType === "post"} onClick={() => setPostType("post")}>
                  Short Post
                </ToggleButton>
              </div>
            </div>
          </div>

          {/* Excerpt Textarea */}
          {/* <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="One or two sentences that summarize the post — shown in feed cards."
              rows={2}
              className="w-full p-3 rounded-xl border border-border bg-secondary/30 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div> */}

          {/* Markdown Content Editor */}
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Content</label>
            <MarkdownEditor value={content} onChange={setContent} />
          </div>

          {/* Error Message Feedback */}
          {error && <p className="text-sm text-destructive">{error}</p>}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              disabled={submitting !== null}
              onClick={() => handleSubmit("publish")}
              className="h-11 px-6 rounded-full bg-pakistan-green text-cornsilk hover:bg-dark-moss transition-colors"
            >
              {submitting === "publish" ? "Publishing…" : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 px-4 rounded-full text-sm border transition-all duration-150  ${
        active
          ? "bg-pakistan-green text-white border-white/60  "
          : "bg-secondary/40 text-muted-foreground/50 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
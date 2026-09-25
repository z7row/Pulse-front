// app/blog/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { nature } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import CoverImageInput from "@/components/blog/editor/CoverImageInput";
import MarkdownEditor from "@/components/blog/editor/MarkdownEditor";
import { Selectcomponent } from "@/components/blog/create/Select";
import { useBlogFetch } from "@/hooks/useBlogFetch";

const categories = ["Sustainability", "Agriculture", "Climate", "Community"];

export default function EditBlogPage() {
  const router = useRouter();
  const { blog, loading: fetching } = useBlogFetch();

  // ---------------------------------------------------------------------------
  // Form state — same shape as the create page, prefilled once the blog loads
  // ---------------------------------------------------------------------------
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [postType, setPostType] = useState<"blog" | "post">("blog");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [bannerRemoved, setBannerRemoved] = useState(false);
  const [submitting, setSubmitting] = useState<"publish" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isallow, setisallow] = useState(true)
  // Auth check — same pattern as the create page
  useEffect(() => {
    const token = Cookies.get("access_token");

    async function Getpremtion() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/c/${blog._id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })
        // console.log(res);
        const allow = await res.json()

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || "no alllow");
        }
        setisallow(allow)
        if (!token) {
          router.push("/auth/login");
        }
        if (!isallow) {
          router.push(`/blog/${blog._id}`);
        }
      } catch (err) {
      //  console.error("Permission check failed:", err);
        setisallow(false);
        // router.push(`/blog/${blog._id}`);
      }
    }
    Getpremtion()

  }, [router, blog._id]);

  // Prefill the form once real blog data comes back from useBlogFetch
  useEffect(() => {
    if (fetching) return;
    setTitle(blog.title);
    setCategory(blog.category);
    setPostType(blog.type);
    setContent(blog.content);
  }, [blog, fetching]);

  // ---------------------------------------------------------------------------
  // Upload a new cover image to Cloudinary, same as the create page
  // ---------------------------------------------------------------------------
  async function uploadImageFile(file: File, token: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to upload cover image");
    }

    const data = await res.json();
    return data.url;
  }

  // ---------------------------------------------------------------------------
  // Submit — PATCH /blog/[id]
  // ---------------------------------------------------------------------------
  async function handleSubmit() {
    setError(null);
    const token = Cookies.get("access_token");
    if (!token) return;

    if (!title.trim()) {
      setError("Please give your post a title first.");
      return;
    }
    if (!content.trim()) {
      setError("The post needs content before you can save it.");
      return;
    }

    setSubmitting("publish");

    try {
      // Only touch the banner field if it actually changed —
      // new file uploaded, or the existing one was explicitly removed.
      let bannerUrl: string | null | undefined = undefined;
      if (coverFile) {
        bannerUrl = await uploadImageFile(coverFile, token);
      } else if (bannerRemoved) {
        bannerUrl = null;
      }

      const payload: Record<string, unknown> = {
        title,
        content,
        type: postType, // "blog" | "post"
        category,
      };
      if (bannerUrl !== undefined) payload.banner = bannerUrl;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${blog._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update blog post");
      }

      router.push(`/blog/${blog._id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(null);
    }
  }

  if (fetching) {
    return (
      <main className="w-full pt-28 pb-24 bg-card min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-muted-foreground text-sm">Loading post…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full pt-28 pb-24 bg-card">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className={`${nature.className} text-foreground text-4xl mb-8`}>
          Edit story
        </h1>

        <div className="space-y-6">
          {/* Cover Image — prefilled with the existing banner, no logo field here on purpose */}
          <CoverImageInput
            initialImageUrl={blog.banner}
            onFileSelected={setCoverFile}
            onRemoveExisting={() => setBannerRemoved(true)}
          />

          {/* Title Input */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className={`${nature.className} w-full text-3xl bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none border-b border-border pb-3`}
          />

          {/* Category & Type */}
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

          {/* Markdown Content Editor */}
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Content</label>
            <MarkdownEditor value={content} onChange={setContent} />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              disabled={submitting !== null}
              onClick={handleSubmit}
              className="h-11 px-6 rounded-full bg-pakistan-green text-cornsilk hover:bg-dark-moss transition-colors"
            >
              {submitting === "publish" ? "Saving…" : "Save Changes"}
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
      className={`h-10 px-4 rounded-full text-sm border transition-all duration-150 ${active
        ? "bg-pakistan-green text-white border-white/60"
        : "bg-secondary/40 text-muted-foreground/50 hover:text-foreground"
        }`}
    >
      {children}
    </button>
  );
}
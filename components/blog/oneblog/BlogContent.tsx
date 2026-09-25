"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { Blog } from "@/lib/blogs";
import LikeButton from "../LikeButton";
import { BadgePlus, MessageCircle, Send, Loader2 } from "lucide-react";
import { formatNumber } from "@/lib/formatnumber";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommentCard } from "./CommentCard";

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  const t = useTranslations("Blog.detail");
  const [showInput, setShowInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    setLoading(true);
    setError("");

    try {
      const token = Cookies.get("access_token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${blog._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: commentText }),
        }
      );

      if (!res.ok) throw new Error(t("commentFailed"));

      setCommentText("");
      setShowInput(false);
      window.location.reload();
    } catch (err: any) {
      setError(err?.message || t("commentFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-6">
      <div className="flex gap-2 my-4">
        <LikeButton blogId={blog._id} likes={blog.likes} />
        <button
          type="button"
          onClick={(event) => event.preventDefault()}
          className="flex items-center gap-2 rounded-full border border-[#FEFAE0]/15 px-3 py-1 text-xs text-[#FEFAE0]/65 transition-all hover:border-[#DDA15E]/40"
        >
          <MessageCircle className="size-3.5" />
          {formatNumber(blog.comments?.length || 0)}
        </button>
      </div>

      <div className="whitespace-pre-line text-lg leading-8 text-foreground/85 sm:text-xl sm:leading-9">
        {blog.content}
      </div>

      <div className="mt-8">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {t("commentsCount", { count: blog.comments?.length || 0 })}
          </h2>
          <Button
            onClick={() => setShowInput((prev) => !prev)}
            variant={showInput ? "outline" : "default"}
          >
            <BadgePlus className="mr-1 size-4" />
            {showInput ? t("cancel") : t("addComment")}
          </Button>
        </div>

        {showInput && (
          <div className="mb-6 space-y-3 rounded-xl border border-border/50 bg-card p-4 transition-all">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t("commentPlaceholder")}
              rows={3}
              className="resize-none"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex justify-end">
              <Button
                onClick={handleAddComment}
                disabled={loading || !commentText.trim()}
                size="sm"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <Send className="mr-2 size-4" /> {t("publish")}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-6" id="comments">
          {blog.comments?.length > 0 ? (
            blog.comments.map((comment: any, index: number) => (
              <CommentCard key={comment._id || index} blogId={blog._id} comment={comment} />
            ))
          ) : (
            <p className="text-muted-foreground">{t("noComments")}</p>
          )}
        </div>
      </div>
    </section>
  );
}

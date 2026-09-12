"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Blog } from "@/lib/blogs";
import LikeButton from "../LikeButton";
import { BadgePlus, MessageCircle, Send, Loader2 } from "lucide-react";
import { formatNumber } from "@/lib/formatnumber";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getusersprofile, profile } from "@/lib/profile.st";
import { CommentCard } from "./CommentCard";

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [commenterprofile, setcommenterprofile] = useState<profile | null>(null);
  // useEffect(() => {
  //   async function loadData() {
  //     setLoading(true);
  //     const res = await getusersprofile({ id: blog.comments });
  //     setcommenterprofile(res);
  //     setLoading(false);
  //   }

  //   loadData();
  // }, [userId]);
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
          body: JSON.stringify({
            content: commentText,
          }),
        }
      );

      if (!res.ok) throw new Error("failed");

      setCommentText("");
      setShowInput(false);
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "thre's a problem");
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
            Comments ({blog.comments?.length || 0})
          </h2>
          <Button
            onClick={() => setShowInput((prev) => !prev)}
            variant={showInput ? "outline" : "default"}
          >
            <BadgePlus className="mr-1 size-4" />
            {showInput ? "Cancel" : "Add Comment"}
          </Button>
        </div>

        {showInput && (
          <div className="mb-6 space-y-3 rounded-xl border border-border/50 bg-card p-4 transition-all">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="add your comment"
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
                    <Send className="mr-2 size-4" /> Puplish
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* <div className="space-y-6">
          {blog.comments?.length > 0 ? (
            blog.comments.map((comment: any, index: number) => (
              <div
                key={comment._id || index}
                className="rounded-xl border border-border/50 bg-card p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium">
                    {comment.author?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <span className="font-medium">
                    {comment.author || "Unknown"}
                  </span>
                </div>
                <p className="leading-7 text-card-foreground/80">
                  {comment.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No comments yet.</p>
          )}
        </div> */}


        <div className="space-y-6" id="comments">
  {blog.comments?.length > 0 ? (
    blog.comments.map((comment: any, index: number) => (
      <CommentCard key={comment._id || index} blogId={blog._id}  comment={comment} />
    ))
  ) : (
    <p className="text-muted-foreground">No comments yet.</p>
  )}
</div>
      </div>
    </section>
  );
}
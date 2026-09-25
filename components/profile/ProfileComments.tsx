"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { getMyComments, deleteComment, updateComment } from "@/lib/api/profile";

interface CommentItem {
  _id: string;
  content: string;
  createdAt: string;
  blog: {
    _id: string;
    title: string;
  };
}

export default function ProfileComments() {
  const t = useTranslations("Profile.comments");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingTarget, setDeletingTarget] = useState<{ blogId: string; commentId: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMyComments()
      .then((data) => setComments(data.comments || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!deletingTarget) return;
    setIsSubmitting(true);
    try {
      await deleteComment(deletingTarget.blogId, deletingTarget.commentId);
      setComments((prev) => prev.filter((c) => c._id !== deletingTarget.commentId));
      setDeletingTarget(null);
    } catch (err) {
      console.error(err);
      alert(t("deleteError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (blogId: string, commentId: string) => {
    if (!editContent.trim()) return;
    setIsSubmitting(true);
    try {
      await updateComment(blogId, commentId, editContent);
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, content: editContent } : c))
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert(t("updateError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (comments.length === 0 && !loading) {
    return (
      <div className="mt-12 text-center text-sm text-muted-foreground">
        {t("empty")}
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 space-y-4">
        {comments.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl border border-border/50 bg-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t("commentedOn")}</span>
                <Link
                  href={`/blog/${item.blog._id}`}
                  className="font-medium text-foreground hover:underline line-clamp-1"
                >
                  {item.blog.title}
                </Link>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(item._id);
                    setEditContent(item.content);
                  }}
                  className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                  title={t("editTitle")}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeletingTarget({ blogId: item.blog._id, commentId: item._id })}
                  className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  title={t("deleteTitle")}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {editingId === item._id ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-2 text-sm focus:outline-none"
                  rows={2}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 text-xs rounded-lg border border-border hover:bg-muted"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    onClick={() => handleUpdate(item.blog._id, item._id)}
                    disabled={isSubmitting}
                    className="px-3 py-1 text-xs rounded-lg bg-primary text-primary-foreground hover:opacity-90"
                  >
                    {t("save")}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-foreground/90">{item.content}</p>
            )}

            <span className="text-[10px] text-muted-foreground block">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {deletingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-lg space-y-4">
            <h3 className="text-lg font-semibold">{t("deleteConfirmTitle")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("deleteConfirmDesc")}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingTarget(null)}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-border hover:bg-muted"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-medium bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90"
              >
                {isSubmitting ? t("deleting") : t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

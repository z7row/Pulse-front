"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { getusersprofile } from "@/lib/api/profile";
import { profile } from "@/lib/profile.st";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CommentCardProps {
  comment: any;
  blogId: string;
}

export function CommentCard({ comment, blogId }: CommentCardProps) {
  const t = useTranslations("Blog.commentCard");
  const [user, setUser] = useState<profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content || "");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      try {
        const payloadBase64 = token.split(".")[1];
        if (payloadBase64) {
          const decodedPayload = JSON.parse(atob(payloadBase64));
          setCurrentUserId(decodedPayload._id || decodedPayload.id || decodedPayload.sub);
        }
      } catch (err) {
        console.error("Failed to decode auth token:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!comment?.author) return;

    async function fetchAuthor() {
      try {
        setLoading(true);
        const resData = await getusersprofile({ id: comment.author });
        if (!resData) throw new Error("Fetch failed");
        const actualProfile = (resData as any).data || (resData as any).user || resData;
        setUser(actualProfile);
      } catch (err) {
        console.error("Fetch author profile error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthor();
  }, [comment?.author]);

  const isMyComment = Boolean(currentUserId && comment.author === currentUserId);

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      const token = Cookies.get("access_token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${blogId}/comment/${comment._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Delete action failed");
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!content.trim() || content === comment.content) {
      setIsEditing(false);
      return;
    }

    setActionLoading(true);
    try {
      const token = Cookies.get("access_token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${blogId}/comment/${comment._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!res.ok) throw new Error("Update action failed");

      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {user?.name ? (
            <img
              src={user.profilephoto || "/photos/logo/logo-bg-up.jpg"}
              alt={user.name || t("user")}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              {loading ? "..." : user?.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}

          <span className="font-medium">
            {loading ? t("loading") : user?.name || t("unknownAuthor")}
          </span>
        </div>

        {isMyComment && (
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  disabled={actionLoading}
                  className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Pencil className="size-4" />
                </button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type="button"
                      disabled={actionLoading}
                      className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                    >
                      {actionLoading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t("deleteTitle")}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t("deleteDesc")}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {t("delete")}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={actionLoading}
                  className="rounded p-1 text-green-500 transition-colors hover:bg-muted"
                >
                  {actionLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Check className="size-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setContent(comment.content);
                  }}
                  disabled={actionLoading}
                  className="rounded p-1 text-destructive transition-colors hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2 space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-none rounded-lg border border-border bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            rows={3}
          />
        </div>
      ) : (
        <p className="leading-7 text-card-foreground/80">{comment.content}</p>
      )}
    </div>
  );
}

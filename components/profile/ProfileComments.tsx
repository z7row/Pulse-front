"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { getidComments } from "@/lib/api/profile";

interface CommentItem {
  _id: string;
  content: string;
  createdAt: string;
  blog: {
    _id: string;
    title: string;
  };
}

export default function ProfileCommentsMe({ id }: { id: string | "" }) {
  const t = useTranslations("Profile.comments");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function getidPostss() {
      const commentapi = await getidComments(id);
      setComments(commentapi.comments);
    }
    getidPostss();
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="mt-8 space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!comments && !loading) {
    return (
      <div className="mt-12 text-center text-sm text-muted-foreground">
        {t("empty")}
      </div>
    );
  }

  return (
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
          </div>

          <p className="text-sm text-foreground/90">{item.content}</p>

          <span className="text-[10px] text-muted-foreground block">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}

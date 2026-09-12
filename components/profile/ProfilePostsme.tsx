




"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Heart, Pencil, Trash2 } from "lucide-react";
import { getMyPosts, deletePost } from "@/lib/api/profile";
import { Blog } from "@/lib/blogs";

export default function ProfilePosts() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getMyPosts()
      .then((data) => setPosts(data.blogs || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deletePost(deletingId);
      setPosts((prev) => prev.filter((p) => p._id !== deletingId));
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حذف المقال");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="aspect-[4/3] rounded-2xl bg-muted" />
            <div className="h-4 w-1/4 rounded bg-muted" />
            <div className="h-5 w-3/4 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0 && !loading) {
    return (
      <div className="mt-12 text-center text-sm text-muted-foreground">
        No posts published yet.
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-4 flex flex-col justify-between"
          >
            <div>
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={post?.banner || "/photos/hero-bg.jpg"}
                  alt={post.title}
                  width={800}
                  height={500}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500"
                />
              </div>

              <div className="mt-4">
                <p className="text-xs text-muted-foreground">
                  {post.category || "General"}
                </p>

                <Link href={`/blog/${post._id}`}>
                  <h2 className="mt-1 line-clamp-2 font-medium hover:underline">
                    {post.title}
                  </h2>
                </Link>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                  {post.likes?.length || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {post.views || 0}
                </span>
              </div>

              {/* أزرار التعديل والحذف */}
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/blog/${post._id}/edit`)}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeletingId(post._id)}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation pop-up */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-lg space-y-4">
            <h3 className="text-lg font-semibold">Delete confirmation</h3>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-border hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-medium bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Confirm delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
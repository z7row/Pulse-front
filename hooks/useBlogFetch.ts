import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  type: "post" | "blog";
  category: string;
  author: string;
  logo: string;
  banner: string;
  createdAt: string;
  likes: any[];
  comments: any[];
  views: number;
}

const DEFAULT_BLOG: Blog = {
  _id: "1",
  title: "404",
  content: "This Blog not found",
  type: "blog",
  category: "Not Found",
  author: "Pulse",
  logo: "/photos/logo/logo-bg-up.jpg",
  banner: "/photos/404.png",
  createdAt: "2026-08-26",
  likes: [],
  comments: [],
  views: 404,
};

export function useBlogFetch() {
  const params = useParams();
  const id = params?.id;
  const [blog, setBlog] = useState<Blog>(DEFAULT_BLOG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function Getblog() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    Getblog();
  }, [id]);

  return { blog, loading };
}

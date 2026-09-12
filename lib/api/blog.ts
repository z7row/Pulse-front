// lib/api/blog.ts
import { Blog } from "@/lib/blogs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "Good";

export async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/blog`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000), 
    });

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
  // console.log("Fetch blogs failed:", error);
    return [];
  }
}
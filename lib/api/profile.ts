import { profile } from "@/lib/profile.st";
import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

export async function getusersprofile({ id }: { id: string }): Promise<profile | null> {
  try {
    const res = await fetch(`${API_URL}/profile/${id}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000), 
    });

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch profile failed:", error);
    return null;
  }
}


export async function getMyPosts(page = 1, limit = 10) {
  const token = Cookies.get("access_token");
  const res = await fetch(`${API_URL}/profile/me/get-posts?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getMyComments(page = 1, limit = 10) {
  const token = Cookies.get("access_token");
  const res = await fetch(`${API_URL}/profile/me/get-comments?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}
export async function getidPosts(id: string, page = 1, limit = 10) {
  const res = await fetch(`${API_URL}/profile/${id}/get-posts?page=${page}&limit=${limit}`, {
   
  });
  console.log(res)
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getidComments(id: string ) {
  const res = await fetch(`${API_URL}/profile/${id}/get-comments`, {
  });
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function deletePost(postId: string) {
  const token = Cookies.get("access_token");
  const res = await fetch(`${API_URL}/blog/${postId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}

export async function deleteComment(blogId: string, commentId: string) {
  const token = Cookies.get("access_token");
  const res = await fetch(`${API_URL}/blog/${blogId}/comment/${commentId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
}

export async function updateComment(blogId: string, commentId: string, content: string) {
  const token = Cookies.get("access_token");
  const res = await fetch(`${API_URL}/blog/${blogId}/comment/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to update comment");
  return res.json();
}
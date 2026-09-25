import Cookies from "js-cookie";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004";

export async function Makelike({ blogid }: { blogid: string }) {
  const token = Cookies.get("access_token");

  try {
    const res = await fetch(`${API_BASE_URL}/blog/${blogid}/like`, {
     method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
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
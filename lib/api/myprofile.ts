import { profile } from "@/lib/profile.st";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

export async function getmeProfile(): Promise<profile | null> {
  try {
    const token = Cookies.get("access_token");
    if (!token) {
      throw new Error(`theres no token`);
    }
    const endpoint = `${API_BASE_URL}/profile/me`;

    const res = await fetch(endpoint, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(4000),
    });
  // console.log(res)
    if (res.status === 401) {
      console.error("Unauthorized: Token is invalid or expired.");
      return null;
    }
    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }
    const data = await res.json();

    return data
  } catch (error) {
    console.error("Fetch profile failed:", error);
    return null;
  }
}
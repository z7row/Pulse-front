"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Makelike } from "@/lib/api/makelike";
import { profile } from "@/lib/profile.st";
import { getmeProfile } from "@/lib/api/myprofile";
import Cookies from "js-cookie";

interface LikeButtonProps {
  blogId: string;
  likes?: (string | { _id: string })[];
}

export default function LikeButton({ blogId, likes = [] }: LikeButtonProps) {
  const t = useTranslations("Blog.like");
  const [user, setUser] = useState<profile | null>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(likes.length);
  const [fetchingUser, setFetchingUser] = useState<boolean>(true);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      const token = Cookies.get("access_token");

      if (token) {
        try {
          const res = await getmeProfile();
          const profileData = res?.data || res;

          if (profileData && isMounted) {
            setUser(profileData);
            const fetchedId = profileData._id || profileData.id;
            if (fetchedId) {
              setUserId(String(fetchedId));
            }
          }
        } catch (err) {
          console.error("Profile fetch error:", err);
        }
      }

      if (isMounted) {
        setFetchingUser(false);
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setLikesCount(likes.length);

    if (userId) {
      const formattedLikes = likes.map((id) =>
        typeof id === "object" && id !== null ? String(id._id) : String(id)
      );
      setIsLiked(formattedLikes.includes(String(userId)));
    }
  }, [likes, userId]);

  function formatNumber(number: number | undefined | null) {
    if (number === undefined || number === null || isNaN(number)) return "0";
    if (number >= 1000) return (number / 1000).toFixed(1) + "k";
    return number.toString();
  }

  async function handleLike() {
    if (likeLoading || !userId) return;

    const prevIsLiked = isLiked;
    const prevCount = likesCount;

    setIsLiked(!prevIsLiked);
    setLikesCount((prev) => (prevIsLiked ? prev - 1 : prev + 1));
    setLikeLoading(true);

    try {
      const res = await Makelike({ blogid: blogId });
      if (!res || res.error) {
        setIsLiked(prevIsLiked);
        setLikesCount(prevCount);
      }
    } catch {
      setIsLiked(prevIsLiked);
      setLikesCount(prevCount);
    } finally {
      setLikeLoading(false);
    }
  }

  if (fetchingUser) {
    return <div className="size-6 animate-pulse rounded-full bg-white/10" />;
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={likeLoading || !user}
      aria-label={isLiked ? t("unlike") : t("like")}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all cursor-pointer ${
        isLiked
          ? "border-red-500/50 bg-red-500/10 text-red-500"
          : "border-[#FEFAE0]/15 text-[#FEFAE0]/65 hover:border-[#DDA15E]/40"
      }`}
    >
      <Heart
        className={`size-3.5 transition-transform ${
          isLiked ? "scale-110 fill-current text-red-500" : ""
        }`}
      />
      <span>{formatNumber(likesCount)}</span>
    </button>
  );
}

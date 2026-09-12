"use client";

import { profile } from "@/lib/profile.st";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function ProfileInCard({ autherid }: { autherid: string }) {
  const [userProfile, setUserProfile] = useState<profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!autherid) return;

    async function getAuthor() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/${autherid}`,
          { method: "GET" }
        );

        if (!res.ok) throw new Error("Fetch failed");

        const resData = await res.json();
        
        const actualProfile = resData.data || resData.user || resData;
        setUserProfile(actualProfile);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    getAuthor();
  }, [autherid]); 

  if (loading) {
    return <span className="text-xs text-muted-foreground">Loading...</span>;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative size-9 overflow-hidden rounded-full border border-[#606C38]/30">
        <Image
          src={userProfile?.profilephoto || "/photos/logo/logo.png"}
          alt={userProfile?.name || "Author"}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <Link href={`/profile/${userProfile?._id}`} className="block min-w-0">
          <p className="font-medium text-[#FEFAE0] uppercase">
            {userProfile?.name || "Author"}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ProfileInCard;
"use client"
import Cookies from "js-cookie";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { getmeProfile } from "@/lib/api/myprofile";
import { useEffect, useState } from "react";
import { profile } from "@/lib/profile.st";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileSkeleton";
import { useRouter } from "next/navigation";
import ProfilePostsMe from "@/components/profile/ProfilePostsme";
import ProfileCommentsMe from "@/components/profile/ProfileCommentsme";
import ProfileHeaderME from "@/components/profile/ProfileHeaderME";

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const accessToken = Cookies.get("access_token");
  const [activeTab, setActiveTab] = useState<string>("Posts");
  useEffect(() => {
    if (!accessToken) {
      setUser(null);
      setLoading(false);
      router.push("/auth/login")
      return;
    }
    getmeProfile()
      .then((res: any) => {
        const userData = res?.data?.data?.user ?? res?.data?.user ?? res?.data ?? res;
        setUser(userData);
        console.log(userData, "kkkkkk", res)

      })
      .catch(() => setUser(null))
      .finally(() => {
        setLoading(false);
      });


    console.log(user, "lllllllllllllllll")
  }, [accessToken]);






  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
        {loading ? <ProfileHeaderSkeleton /> : <ProfileHeaderME user={user} />}

        <ProfileTabs activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-6">
          {activeTab === "Posts" ? <ProfilePostsMe /> : <ProfileCommentsMe />}
        </div>      
        </div>
    </main>
  );
}
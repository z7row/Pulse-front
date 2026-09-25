"use client"
import Cookies from "js-cookie";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfilePosts from "@/components/profile/ProfilePosts";
import { useEffect, useState } from "react";
import { getusersprofile, profile } from "@/lib/profile.st";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileSkeleton";
import { useRouter } from "next/navigation";
import ProfileComments from "@/components/profile/ProfileComments";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, SquareLibrary, UserX } from "lucide-react";
export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const accessToken = Cookies.get("access_token");
  const [activeTab, setActiveTab] = useState<string>("Posts");
  const [notfound, setnoiotfound] = useState<boolean>(true);
  const params = useParams();
  const id = params.id as string;
  useEffect(() => {




    console.log(id)
    getusersprofile({ id })
      .then((res: any) => {
        const userData = res?.data?.data?.user ?? res?.data?.user ?? res?.data ?? res;
        setUser(userData);
        console.log(userData, "kkkkkk", res)
        if (res.status == 400 ||res.status == 404  ) {
          setnoiotfound(false)
        }

      })
      .catch(() => {
        setUser(null)
        setnoiotfound(false)
      }
      )
      .finally(() => {
        setLoading(false);
      });


    console.log(user, "lllllllllllllllll")
  }, [accessToken]);
  if (!user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-muted/30 p-8 text-center">
        <div className="mb-4 rounded-full bg p-4 text-muted-foreground">
          <UserX className="size-12" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">User Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The user you are looking for does not exist or has been removed.
        </p>
        <Button asChild className="mt-6 gap-2 rounded-full px-6">
          <Link href="/blog">
            <SquareLibrary className="size-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }





  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
        {loading ? <ProfileHeaderSkeleton /> : <ProfileHeader user={user} />}

        <ProfileTabs activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-6">
          {activeTab === "Posts" ? <ProfilePosts id={id} /> : <ProfileComments id={id} />}
        </div>
      </div>
    </main>
  );
}
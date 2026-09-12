"use state"
import { Blog } from "@/lib/blogs";
import { profile } from "@/lib/profile.st";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


interface BlogMetaProps {
  blog: Blog;
}

export default function BlogMeta({ blog }: BlogMetaProps) {
  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
 const [userProfile, setUserProfile] = useState<profile | null>(null);
  const [loading, setLoading] = useState(true);
const autherid = blog.author
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
    <div className="mb-8 relative flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <Link href={`/profile/${userProfile?._id}`}> <div className="flex items-center gap-3">
        <Image
          src={blog.logo || "/photos/logo/logo-bg-up.jpg"}
          alt={blog.author}
          width={38}
          height={38}
          className="rounded-full object-cover border border-amber-50"
        />
       
          <Image
            src={userProfile?.profilephoto || "/photos/logo/logo-bg-up.jpg"}
            alt={blog.author}
            width={1666}
            height={766}
           className="rounded-full  h-10 w-10 absolute object-cover object-center border border-amber-50 left-6 "
          />
       

        <span className="text-foreground uppercase ml-6">{userProfile?.name}</span>
      </div>
 </Link>
      <span className="text-muted-foreground/40">•</span>

      <span>{date}</span>

     {blog.category ? <div>
        <span className="text-muted-foreground/40">•</span>
        <span className="rounded-full">
          {blog.category}
        </span>
      </div>: ""}

      <span className="text-muted-foreground/40">•</span>

      <span>{blog.views} views</span>
    </div>
  );
}
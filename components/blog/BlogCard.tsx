"use client";

import { reveal } from "@/lib/animations";
import { motion } from "framer-motion";
import { Eye, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Blog } from "@/lib/blogs";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import ProfileInCard from "./profileInCard";
import LikeButton from "./LikeButton";
import { formatNumber } from "@/lib/formatnumber";
import { useState } from "react";
import { useLocale } from "next-intl";

export default function BlogCard({ blog }: { blog: Blog }) {
  const t = useTranslations("Blog.card");
  const locale = useLocale();
  const fallback = "/photos/journal/forest-patience.jpg";

  const initialSrc = blog.banner ? encodeURI(blog.banner) : fallback;
  const [imgSrc, setImgSrc] = useState(initialSrc);

  const typeLabel = blog.type === "blog" ? t("typeBlog") : t("typePost");
  const timeAgo = blog.createdAt
    ? formatDistanceToNow(new Date(blog.createdAt), {
        addSuffix: true,
        locale: locale === "ar" ? ar : enUS,
      })
    : t("recently");

  return (
    <motion.article
      variants={reveal}
      className="group w-full max-w-2xl overflow-hidden rounded-3xl border border-[#606C38]/15 bg-[#102313] flex flex-col"
    >
      {blog.banner && (
        <Link
          href={`/blog/${blog._id}`}
          className="relative aspect-vide w-full shrink-0 overflow-hidden"
        >
          <Image
            src={imgSrc}
            alt={blog.title}
            width={1000}
            height={100}
            priority
            onError={() => setImgSrc(fallback)}
            className="object-cover h-60 w-full"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#08140A] to-20% to-transparent" />

          {blog.category && (
            <div className="absolute left-3 top-3 z-10 rounded-full border border-[#FEFAE0]/15 bg-[#08140A]/55 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#FEFAE0]/80 backdrop-blur-md">
              {blog.category}
            </div>
          )}
        </Link>
      )}

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary-foreground">
            <span>{typeLabel}</span>
            <span className="size-1 rounded-full bg-[#606C38]" />
            {timeAgo}
          </div>

          <Link href={`/blog/${blog._id}`} className="block min-w-0">
            <h2 className="relative mt-2 text-lg w-fit font-bold leading-snug tracking-[-0.03em] text-[#FEFAE0] transition-all duration-300 group-hover:text-white/80 line-clamp-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-white/80 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
              {blog.title}
            </h2>
          </Link>
          <Link href={`/blog/${blog._id}`} className="block min-w-0">
            <p className="mt-2 line-clamp-2 max-w-full text-xs leading-6 text-[#FEFAE0]/55">
              {blog.content}
            </p>
          </Link>
        </div>

        <div className="mt-4 flex justify-between gap-3 border-t border-[#FEFAE0]/10 pt-4">
          <ProfileInCard autherid={blog.author} />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#FEFAE0]/45 mx-2">
              <span className="flex items-center gap-1.5 text-xs">
                <Eye className="size-3.5" />
                {formatNumber(blog.views)}
              </span>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <LikeButton blogId={blog._id} likes={blog.likes} />
              <Link href={`/blog/${blog._id}#comments`}>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-[#FEFAE0]/15 px-3 py-1 text-xs text-[#FEFAE0]/65 transition-all hover:border-[#DDA15E]/40"
                >
                  <MessageCircle className="size-3.5" />
                  {formatNumber(blog.comments?.length || 0)}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

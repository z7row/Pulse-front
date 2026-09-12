"use client";

import { useState } from "react";
import BlogSkeleton from "@/components/blog/oneblog/BlogSkeleton";
import BlogMeta from "@/components/blog/oneblog/BlogMeta";
import BlogHero from "@/components/blog/oneblog/BlogHero";
import BlogContent from "@/components/blog/oneblog/BlogContent";
import BlogSideBar from "@/components/blog/BlogSideBar";
import BreadcrumbBlog from "@/components/blog/oneblog/BreadcrumbBlog";
import { useBlogFetch } from "@/hooks/useBlogFetch";

export default function OneBlogPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { blog, loading } = useBlogFetch();

  if (loading) return <BlogSkeleton />;

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Sidebar Section */}
      <aside className="fixed top-0 left-0 z-50 h-screen">
        <BlogSideBar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />
      </aside>

      {/* Main Article Content */}
      <article
        className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 lg:py-20 transition-all duration-300"

        style={{
          paddingLeft: `max(16px, calc(${sidebarCollapsed ? "88px" : "270px"} * var(--is-desktop, 1)))`,
        }}
      >
        <div className="md:hidden h-12" />

        <BreadcrumbBlog />
        {/* <BlogHeader /> */}
        <BlogMeta blog={blog} />
        <BlogHero blog={blog} />
        <BlogContent blog={blog} />
      </article>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { stagger } from "@/lib/animations";
import BlogCard from "@/components/blog/BlogCard";
import BlogSideBar from "@/components/blog/BlogSideBar";
import BlogControls from "@/components/blog/BlogControls";
import BlogPagination from "@/components/blog/BlogPagination";
import { useBlogs } from "@/hooks/useBlogs";

export default function BlogsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const {
    blogs,
    loading,
    filter,
    setFilter,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    login,
  } = useBlogs();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08140A] text-white">
        <p className="text-lg">Loading blogs...</p>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#08140A] text-[#FEFAE0] flex flex-col items-center transition-[padding-left] duration-300 w-full"
      style={{ paddingLeft: isMobile ? 80 : sidebarCollapsed ? 70 : 256 }}
    >
      <aside className="fixed top-0 left-0 z-50 h-screen">
        <BlogSideBar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />
      </aside>

      <section className="w-full px-4 sm:px-6 lg:px-10 pt-16 sm:pt-12 pb-12 flex flex-col items-center max-w-7xl mx-auto">
        <BlogControls
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          isMobile={isMobile}
        />

        {/* Articles List */}
        <motion.div
          key={`${filter}-${search}-${page}`}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-8 space-y-6 w-full flex flex-col items-center"
        >
          {blogs.map((blog, index) => (
            <BlogCard key={`${blog._id}-${index}`} blog={blog} />
          ))}

          {blogs.length === 0 && (
            <div className="mx-auto w-full max-w-xl rounded-[28px] border border-[#FEFAE0]/10 bg-[#102313] px-6 py-16 text-center">
              <Search className="mx-auto size-8 text-[#606C38]" />
              <h3 className="mt-4 text-xl font-bold">No stories found</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#FEFAE0]/40">
                Try another search or category.
              </p>
            </div>
          )}
        </motion.div>

        {blogs.length > 0 && (
          <BlogPagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </section>

      {/* Add Blog Floating Button */}
     {login? <Link
        href="/blog/create"
        className="group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-2 rounded-full bg-[#DDA15E] px-4 py-3 sm:px-5 sm:py-3.5 text-xs font-semibold text-[#08140A] shadow-2xl shadow-black/30 transition-all duration-500 hover:-translate-y-1 hover:bg-[#FEFAE0]"
      >
        <Plus className="size-4 transition-transform duration-500 group-hover:rotate-90" />
        <span>Add Blog</span>
      </Link> : ""}
    </main>
  );
}
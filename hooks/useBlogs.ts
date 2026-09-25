import { useState, useEffect } from "react";
import { Blog, getBlogs } from "@/lib/blogs";
import Cookies from "js-cookie";
export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "blog" | "post">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [login, setislogin] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogs()
      .then((data) => setBlogs(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesFilter = filter === "all" ? true : blog.type === filter;
    const matchesSearch =
      (blog.title?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
      (blog.content?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
      (blog.category?.toLowerCase() ?? "").includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / 10));
  const currentBlogs = filteredBlogs.slice((page - 1) * 10, page * 10);
  useEffect(() => {
    const access_token = Cookies.get("access_token");
    if (access_token) {
      setislogin(true);
    }
  }, []);
  return {
    blogs: currentBlogs,
    loading,
    filter,
    setFilter,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    totalCount: filteredBlogs.length,
    login,
  };
}
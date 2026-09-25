import { Blog } from "@/lib/blogs";
import Image from "next/image";

interface BlogHeroProps {
  blog: Blog;
}

export default function BlogHero({ blog }: BlogHeroProps) {
  return (
    <section>
      <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
        {blog.title}
      </h1>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src={blog.banner || "/photos/hero-bg.jpg"}
          alt={blog.title}
          width={1600}
          height={600}
          priority
          className="aspect-vdeo w-full object-cover"
        />
      </div>

     
    </section>
  );
}
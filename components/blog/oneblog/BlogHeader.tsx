import Image from "next/image";

export default function BlogHeader() {
  return (
    <header className="border-b border-border/50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/photos/logo/logo-bg-up.jpg"
            alt="Logo"
            width={42}
            height={42}
            className="rounded-full object-cover"
          />

          <span className="text-lg font-medium tracking-tight">
            Journal
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
          <a
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Home
          </a>

          <a
            href="/blog"
            className="text-foreground"
          >
            Blog
          </a>

          <a
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
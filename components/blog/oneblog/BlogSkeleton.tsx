import { Skeleton } from "@/components/ui/skeleton";

export default function BlogSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="hidden h-5 w-48 sm:block" />
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-20">
        <div className="mb-8 flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 w-48" />
        </div>

        <Skeleton className="h-12 w-full max-w-3xl sm:h-16" />
        <Skeleton className="mt-3 h-12 w-4/5 sm:h-16" />

        <Skeleton className="mt-10 aspect-video w-full rounded-2xl" />

        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </article>
    </main>
  );
}
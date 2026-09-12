import { Skeleton } from "@/components/ui/skeleton";

export default function BlogFormSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-20">
        <Skeleton className="mb-3 h-4 w-16" />
        <Skeleton className="mb-10 h-12 w-48" />

        <div className="space-y-8">
          <Skeleton className="h-10 w-full" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-[350px] w-full" />

          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </main>
  );
}
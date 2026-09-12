export function ProfileHeaderSkeleton() {
  return (
    <section className="relative animate-pulse">
      {/* Cover Skeleton */}
      <div className="h-56 rounded-4xl bg-muted/60 sm:h-72" />

      {/* Profile Skeleton */}
      <div className="relative -mt-18 px-5 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            {/* Avatar Skeleton */}
            <div className="h-32 w-32 rounded-3xl bg-muted sm:h-36 sm:w-36 border border-background" />

            {/* User Info Skeleton */}
            <div className="pb-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-40 rounded-lg bg-muted" />
                <div className="h-6 w-20 rounded-full bg-muted" />
              </div>

              <div className="h-4 w-60 rounded bg-muted/80" />
              <div className="h-4 w-48 rounded bg-muted/60" />
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="h-10 w-32 rounded-xl bg-muted" />
        </div>
      </div>
    </section>
  );
}
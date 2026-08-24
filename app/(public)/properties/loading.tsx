import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-4 w-32" />

        <Skeleton className="mt-3 h-9 w-72" />

        <Skeleton className="mt-3 h-4 w-96 max-w-full" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar Skeleton */}
        <aside className="h-fit rounded-2xl border p-5">
          <div className="mb-5 flex items-center justify-between">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-10" />
          </div>

          {/* Search */}
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-10 w-full rounded-lg" />

          {/* Category */}
          <Skeleton className="mt-5 h-3 w-20" />
          <Skeleton className="mt-2 h-10 w-full rounded-lg" />

          {/* Min Price */}
          <Skeleton className="mt-5 h-3 w-24" />
          <Skeleton className="mt-2 h-10 w-full rounded-lg" />

          {/* Max Price */}
          <Skeleton className="mt-4 h-3 w-24" />
          <Skeleton className="mt-2 h-10 w-full rounded-lg" />

          {/* Status */}
          <Skeleton className="mt-5 h-3 w-16" />
          <Skeleton className="mt-2 h-10 w-full rounded-lg" />

          {/* Sort */}
          <Skeleton className="mt-5 h-3 w-16" />
          <Skeleton className="mt-2 h-10 w-full rounded-lg" />

          {/* Amenities */}
          <Skeleton className="mt-5 h-3 w-20" />

          <div className="mt-3 space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <Skeleton className="size-4 rounded" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        </aside>

        {/* Property Cards */}
        <div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border"
              >
                {/* Image */}
                <Skeleton className="aspect-[4/3] w-full rounded-none" />

                {/* Content */}
                <div className="space-y-3 p-4">
                  <Skeleton className="h-4 w-3/4" />

                  <Skeleton className="h-3 w-1/2" />

                  <div className="border-t pt-3">
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="size-9 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
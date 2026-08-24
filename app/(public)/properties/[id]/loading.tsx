import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      {/* Back / breadcrumb */}
      <Skeleton className="mb-6 h-4 w-32" />

      {/* Main property section */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Property Image */}
        <Skeleton className="aspect-[4/3] w-full rounded-2xl" />

        {/* Property Info */}
        <div className="flex flex-col">
          {/* Status */}
          <Skeleton className="h-6 w-24 rounded-full" />

          {/* Title */}
          <Skeleton className="mt-4 h-9 w-3/4" />

          {/* Location */}
          <Skeleton className="mt-3 h-4 w-1/2" />

          {/* Price */}
          <div className="mt-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="mt-2 h-3 w-20" />
          </div>

          {/* Divider */}
          <div className="my-6 border-t" />

          {/* Description */}
          <Skeleton className="h-5 w-28" />

          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <Skeleton className="h-5 w-24" />

            <div className="mt-3 flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-8 w-20 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Action button */}
          <Skeleton className="mt-8 h-11 w-full rounded-lg" />
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12 border-t pt-10">
        <Skeleton className="h-7 w-32" />

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border p-5"
            >
              {/* Rating */}
              <Skeleton className="h-4 w-24" />

              {/* Review */}
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* User */}
              <div className="mt-5 flex items-center gap-3">
                <Skeleton className="size-9 rounded-full" />

                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
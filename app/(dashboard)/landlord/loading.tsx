import { Skeleton } from "@/components/ui/skeleton";

export default function LandlordDashboardLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>

        <Skeleton className="h-10 w-36" />
      </div>

      {/* Property Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>

      {/* Request Stats */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>

      {/* Recent Requests + Quick Actions */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SkeletonCard className="h-[390px]" />
        <SkeletonCard className="h-[390px]" />
      </div>

      {/* Recent Properties */}
      <div className="mt-6">
        <SkeletonCard className="h-[350px]" />
      </div>
    </main>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="size-5 rounded-full" />
      </div>

      <Skeleton className="mt-4 h-9 w-16" />

      <Skeleton className="mt-2 h-3 w-32" />
    </div>
  );
}

function SkeletonCard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border bg-card p-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-56" />
        </div>

        <Skeleton className="h-8 w-20" />
      </div>

      <div className="mt-6 space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 rounded-xl border p-4"
          >
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-44" />
              <Skeleton className="h-3 w-20" />
            </div>

            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
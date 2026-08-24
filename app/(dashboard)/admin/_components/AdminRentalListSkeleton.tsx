import { Skeleton } from "@/components/ui/skeleton";

export default function AdminRentalListSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      {/* Header */}
      <div className="border-b bg-muted/40 px-5 py-4">
        <div className="grid grid-cols-5 gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center gap-4 px-5 py-5"
          >
            {/* Tenant */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>

            {/* Property */}
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-lg" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* Rent date */}
            <Skeleton className="h-4 w-24" />

            {/* Expiry */}
            <Skeleton className="h-4 w-24" />

            {/* Status */}
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
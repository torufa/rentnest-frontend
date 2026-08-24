import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewHistorySkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border bg-card"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <Skeleton className="h-48 w-full rounded-none sm:h-auto sm:w-52" />

            {/* Content */}
            <div className="flex-1 space-y-4 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-5 w-28" />
              </div>

              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
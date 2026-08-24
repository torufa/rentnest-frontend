import { Skeleton } from "@/components/ui/skeleton";

export default function LandlordRequestsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border p-5"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <Skeleton className="size-20 shrink-0 rounded-xl" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-6 w-24 rounded-full" />

              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-lg" />
                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
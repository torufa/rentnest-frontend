import { Skeleton } from "@/components/ui/skeleton";

export default function LandlordPropertiesSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border bg-card"
        >
          <Skeleton className="aspect-[4/3] w-full" />

          <div className="space-y-4 p-5">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />

            <div className="flex justify-between pt-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
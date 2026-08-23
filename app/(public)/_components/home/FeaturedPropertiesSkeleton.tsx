import { Skeleton } from "@/components/ui/skeleton";


export default function FeaturedPropertiesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mt-20">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border bg-card p-4 shadow-sm"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full" />
            <Skeleton className="absolute left-3 top-3 h-6 w-20 rounded-full" />
          </div>

          <div className="mt-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            
            <div className="border-t pt-3">
              <Skeleton className="h-6 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
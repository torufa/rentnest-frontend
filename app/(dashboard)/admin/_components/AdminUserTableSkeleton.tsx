import { Skeleton } from "@/components/ui/skeleton";

export default function AdminUserTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="p-5">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-1 px-5 pb-5">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-5 border-t py-5"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-52" />
            </div>

            <Skeleton className="h-6 w-16" />

            <Skeleton className="h-6 w-20" />

            <Skeleton className="h-9 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
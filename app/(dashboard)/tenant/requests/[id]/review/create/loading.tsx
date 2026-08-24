import { Skeleton } from "@/components/ui/skeleton";

export default function TenantReviewsLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-9 w-52" />
        <Skeleton className="mt-3 h-4 w-80 max-w-full" />
      </div>

      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border"
          >
            <div className="flex flex-col sm:flex-row">
              <Skeleton className="h-48 w-full rounded-none sm:h-40 sm:w-52" />

              <div className="flex-1 space-y-4 p-5">
                <div className="flex justify-between gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  <Skeleton className="h-4 w-24" />
                </div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
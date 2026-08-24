import { Skeleton } from "@/components/ui/skeleton";

export default function TenantRentalRequestsLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border bg-card"
          >
            <div className="flex flex-col md:flex-row">
              <Skeleton className="aspect-[16/10] w-full rounded-none md:h-56 md:w-64" />

              <div className="flex-1 p-5 sm:p-6">
                <div className="flex justify-between gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-52" />
                    <Skeleton className="h-4 w-32" />
                  </div>

                  <Skeleton className="h-7 w-24 rounded-full" />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {Array.from({ length: 3 }).map(
                    (_, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="rounded-xl border p-3"
                      >
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="mt-2 h-4 w-20" />
                      </div>
                    ),
                  )}
                </div>

                <div className="mt-6 flex justify-between gap-3">
                  <Skeleton className="h-3 w-36" />
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
import { Skeleton } from "@/components/ui/skeleton";

export default function RentalRequestDetailsLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 lg:px-8">
      <Skeleton className="mb-6 h-9 w-36" />

      <div className="mb-8 flex justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>

        <Skeleton className="h-7 w-24 rounded-full" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="overflow-hidden rounded-xl border lg:col-span-3">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />

          <div className="space-y-5 p-6">
            <div className="flex justify-between">
              <div className="space-y-2">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>

            <Skeleton className="h-16 w-full" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />

              <div className="flex gap-2">
                <Skeleton className="h-7 w-16 rounded-full" />
                <Skeleton className="h-7 w-16 rounded-full" />
                <Skeleton className="h-7 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-6 lg:col-span-2">
          <div className="flex gap-3">
            <Skeleton className="size-10 rounded-xl" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>

          <div className="mt-8 space-y-7">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-3"
              >
                <Skeleton className="size-4" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>

          <Skeleton className="mt-8 h-10 w-full" />
        </div>
      </div>
    </main>
  );
}
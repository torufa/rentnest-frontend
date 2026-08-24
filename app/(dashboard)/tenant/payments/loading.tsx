import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-2 h-9 w-56" />
      </div>

      {/* Payment Cards */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border p-5"
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              {/* Image */}
              <Skeleton className="h-32 w-full rounded-xl sm:w-44" />

              <div className="flex flex-1 flex-col justify-between gap-4">
                {/* Content */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="mt-2 h-4 w-28" />
                    </div>

                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>

                  <Skeleton className="mt-4 h-6 w-24" />
                </div>

                {/* Button */}
                <Skeleton className="h-9 w-full sm:w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
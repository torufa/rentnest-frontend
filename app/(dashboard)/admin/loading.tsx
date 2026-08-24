import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-2 h-9 w-52" />
        <Skeleton className="mt-2 h-4 w-80 max-w-full" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="size-10 rounded-xl" />
              <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="mt-5 h-8 w-20" />
            <Skeleton className="mt-2 h-4 w-28" />
          </div>
        ))}
      </div>

      {/* Main sections */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="rounded-2xl border bg-card">
          <div className="border-b p-5">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="mt-2 h-4 w-48" />
          </div>

          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />

                  <div>
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="mt-2 h-3 w-36" />
                  </div>
                </div>

                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Rentals */}
        <div className="rounded-2xl border bg-card">
          <div className="border-b p-5">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="mt-2 h-4 w-52" />
          </div>

          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5"
              >
                <div>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>

                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
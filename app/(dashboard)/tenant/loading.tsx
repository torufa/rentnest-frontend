import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8 space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border p-5"
          >
            <Skeleton className="size-11 rounded-xl" />

            <Skeleton className="mt-5 h-4 w-28" />

            <Skeleton className="mt-2 h-9 w-12" />

            <Skeleton className="mt-2 h-3 w-32" />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Skeleton className="h-6 w-32" />

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border p-6"
            >
              <Skeleton className="size-5" />
              <Skeleton className="mt-4 h-5 w-36" />
              <Skeleton className="mt-2 h-10 w-full" />
              <Skeleton className="mt-4 h-4 w-28" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
import { Skeleton } from "@/components/ui/skeleton";

export default function EditPropertyLoading() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-9 w-36" />

        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
      </div>

      {/* Form */}
      <div className="space-y-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Property Name */}
          <div className="space-y-2 sm:col-span-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Image */}
          <div className="space-y-2 sm:col-span-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-64" />
          </div>

          {/* Description */}
          <div className="space-y-2 sm:col-span-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-32 w-full" />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Amenities */}
          <div className="space-y-2 sm:col-span-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-64" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </main>
  );
}
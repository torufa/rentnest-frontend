import AdminRentalListSkeleton from "../_components/AdminRentalListSkeleton";


export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <div className="h-8 w-52 animate-pulse rounded bg-muted" />
        <div className="h-4 w-80 animate-pulse rounded bg-muted" />
      </div>

      <AdminRentalListSkeleton />
    </main>
  );
}
import LandlordPropertiesSkeleton from "../_components/landlord/LandlordPropertiesSkeleton";


export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="h-9 w-56 animate-pulse rounded bg-muted" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
      </div>

      <LandlordPropertiesSkeleton />
    </main>
  );
}   
import { getAdminRentals } from "../_actions/admin";
import AdminRentalList from "../_components/AdminRentalList";


export default async function AdminRentalsPage() {
  const response = await getAdminRentals();

  const rentals = response?.data?.result?.RentalRequests ?? [];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Admin Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Rental Requests
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          View all rental requests submitted by tenants.
        </p>
      </div>

      <AdminRentalList rentals={rentals} />
    </main>
  );
}
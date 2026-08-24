import type { TenantRentalRequest } from "@/lib/types";
import { getTenantRentalRequests } from "../_actions/tenant";
import RentalRequestList from "../_components/RentalRequestList";

export default async function TenantRentalRequestsPage() {
  const res = await getTenantRentalRequests();

  const requests: TenantRentalRequest[] = res?.data?.result?.result?.rentalRequests ?? [];

  console.log(requests, "check")

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Tenant Dashboard</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          My Rental Requests
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Track all the rental requests you have submitted.
        </p>
      </div>

      <RentalRequestList requests={requests} />
    </main>
  );
}

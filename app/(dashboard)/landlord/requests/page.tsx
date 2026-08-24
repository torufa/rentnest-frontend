import Image from "next/image";
import { CalendarDays, MapPin, User } from "lucide-react";

import { getLandlordRentalRequests } from "../_actions/landlord";
import RentalRequestActions from "../_components/landlord/RentalRequestActions";

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

    case "APPROVED":
      return "bg-green-500/10 text-green-600 dark:text-green-400";

    case "REJECTED":
      return "bg-red-500/10 text-red-600 dark:text-red-400";

    case "PAID":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";

    default:
      return "bg-muted text-muted-foreground";
  }
};

export default async function LandlordRequestsPage() {
  const res = await getLandlordRentalRequests();

  const requests = res?.data?.result ?? [];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Landlord Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Rental Requests
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Review and manage rental requests from tenants.
        </p>
      </div>

      {!requests.length ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h2 className="text-lg font-semibold">
            No rental requests
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            You currently have no rental requests for your properties.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request: any) => (
            <article
              key={request.id}
              className="rounded-2xl border bg-card p-5 shadow-sm"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                {/* Property image */}
                <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                  {request.property?.picture ? (
                    <img
                      src={request.property.picture}
                      alt={request.property.propertyName}
                      className="block size-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>

                {/* Main info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold">
                      {request.property?.propertyName}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        request.status,
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="size-4" />
                      {request.customer?.name}
                    </span>

                    <span>
                      {request.customer?.email}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      {request.property?.location}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Rent:
                      </span>
                      {formatDate(request.rentDate)}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Expiry:
                      </span>
                      {formatDate(request.rentalExpiryDate)}
                    </span>

                    <span className="font-semibold text-primary">
                      ৳{request.property?.price}/month
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0">
                  <RentalRequestActions
                    requestId={request.id}
                    status={request.status}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  MapPin,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { TenantRentalRequest } from "@/lib/types";

import RentalRequestStatus from "./RentalRequestStatus";

type RentalRequestDetailsProps = {
  request: TenantRentalRequest;
};

export default function RentalRequestDetails({
  request,
}: RentalRequestDetailsProps) {
  const property = request.property;

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-6"
      >
        <Link href="/tenant/requests">
          <ArrowLeft className="mr-2 size-4" />
          Back to Requests
        </Link>
      </Button>

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">
            Tenant Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Rental Request Details
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            View the details and current status of your rental
            request.
          </p>
        </div>

        <RentalRequestStatus
          status={request.status}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Property */}
        <Card className="overflow-hidden lg:col-span-3">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {property.picture ? (
              <img
                src={property.picture}
                alt={property.propertyName}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                No image available
              </div>
            )}
          </div>

          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {property.propertyName}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {property.location}
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-primary">
                  ৳{property.price}
                </p>

                <p className="text-xs text-muted-foreground">
                  / month
                </p>
              </div>
            </div>

            {property.description && (
              <p className="mt-6 text-sm leading-6 text-muted-foreground">
                {property.description}
              </p>
            )}

            {property.amenities?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold">
                  Amenities
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full border bg-muted/40 px-3 py-1 text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rental Information */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Home className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Rental Information
                </h2>

                <p className="text-xs text-muted-foreground">
                  Request #{request.id.slice(0, 8)}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <InfoRow
                icon={Clock3}
                label="Request Status"
                value={
                  <RentalRequestStatus
                    status={request.status}
                  />
                }
              />

              <InfoRow
                icon={CalendarDays}
                label="Rent Date"
                value={formatDate(request.rentDate)}
              />

              <InfoRow
                icon={CalendarDays}
                label="Rental Expiry"
                value={formatDate(
                  request.rentalExpiryDate,
                )}
              />

              <InfoRow
                icon={CalendarDays}
                label="Requested On"
                value={formatDate(request.createdAt)}
              />
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <div className="mt-1 text-sm font-medium">
          {value}
        </div>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
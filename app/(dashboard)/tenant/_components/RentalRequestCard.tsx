import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Home,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { TenantRentalRequest } from "@/lib/types";

import RentalRequestStatus from "./RentalRequestStatus";

type RentalRequestCardProps = {
  request: TenantRentalRequest;
};

export default function RentalRequestCard({
  request,
}: RentalRequestCardProps) {
  const property = request.property;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted md:aspect-auto md:w-64">
            {property.picture ? (
              <img
                    src={property.picture}
                    alt={property.propertyName}
                    className="size-full object-cover transition-transform duration-300 hover:scale-105"
                />
            ) : (
              <div className="flex size-full min-h-48 items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
            <div>
              <div className="flex flex-col justify-between gap-3 sm:flex-row">
                <div>
                  <h2 className="text-xl font-semibold">
                    {property.propertyName}
                  </h2>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {property.location}
                  </div>
                </div>

                <RentalRequestStatus
                  status={request.status}
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <InfoItem
                  icon={Home}
                  label="Monthly Rent"
                  value={`৳${property.price}`}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Rent Date"
                  value={formatDate(request.rentDate)}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Expiry Date"
                  value={formatDate(
                    request.rentalExpiryDate,
                  )}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Requested on{" "}
                {formatDate(request.createdAt)}
              </p>

              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <Link
                  href={`/tenant/requests/${request.id}`}
                >
                  View Details
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-muted/20 p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
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
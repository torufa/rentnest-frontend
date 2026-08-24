import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Rental = {
  id: string;
  status: string;
  rentDate: string;
  rentalExpiryDate: string;
  property?: {
    propertyName: string;
    picture?: string | null;
    location: string;
  };
};

type Props = {
  rentals: Rental[];
};

const statusVariant = (status: string) => {
  if (status === "PAID") return "default";
  if (status === "REJECTED") return "destructive";
  return "secondary";
};

export default function AdminRentalList({
  rentals,
}: Props) {
  if (!rentals.length) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center">
        <h2 className="font-semibold">
          No rental requests found
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rentals.map((rental) => (
        <div
          key={rental.id}
          className="rounded-2xl border bg-card p-5"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            {rental.property?.picture ? (
              <img
                src={rental.property.picture}
                alt={rental.property.propertyName}
                className="h-32 w-full rounded-xl object-cover md:w-44"
              />
            ) : (
              <div className="flex h-32 w-full items-center justify-center rounded-xl bg-muted md:w-44">
                No image
              </div>
            )}

            <div className="flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-semibold">
                    {rental.property?.propertyName}
                  </h2>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {rental.property?.location}
                  </div>
                </div>

                <Badge
                  variant={statusVariant(rental.status)}
                >
                  {rental.status}
                </Badge>
              </div>

              <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {new Date(
                    rental.rentDate,
                  ).toLocaleDateString()}
                </span>

                <span>
                  Until{" "}
                  {new Date(
                    rental.rentalExpiryDate,
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
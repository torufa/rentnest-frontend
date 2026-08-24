import { MapPin, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Property = {
  id: string;
  propertyName: string;
  picture?: string | null;
  location: string;
  price: string;
  status: string;
};

type Props = {
  properties: Property[];
};

export default function AdminPropertyList({
  properties,
}: Props) {
  if (!properties.length) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center">
        <Building2 className="mx-auto size-8 text-muted-foreground" />

        <h2 className="mt-4 font-semibold">
          No properties found
        </h2>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <div
          key={property.id}
          className="overflow-hidden rounded-2xl border bg-card"
        >
          {property.picture ? (
            <img
              src={property.picture}
              alt={property.propertyName}
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="flex h-48 items-center justify-center bg-muted">
              No image
            </div>
          )}

          <div className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold">
                {property.propertyName}
              </h2>

              <Badge variant="secondary">
                {property.status}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {property.location}
            </div>

            <p className="font-semibold">
              ৳{property.price}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / month
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
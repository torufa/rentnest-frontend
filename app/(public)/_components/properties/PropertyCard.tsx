import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Property } from "@/lib/types";

export default function PropertyCard({
  property,
}: {
  property: Property;
}) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group overflow-hidden rounded-2xl border bg-background transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {property.picture ? (
          <Image
            src={property.picture}
            alt={property.propertyName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full border bg-background/90 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
          {property.status}
        </span>
      </div>

      <div className="p-4">
        <h2 className="line-clamp-1 text-base font-semibold group-hover:text-primary">
          {property.propertyName}
        </h2>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" />
          <span className="line-clamp-1">
            {property.location}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <div>
            <span className="font-semibold text-primary">
              ৳{property.price}
            </span>

            <span className="ml-1 text-[11px] text-muted-foreground">
              / month
            </span>
          </div>

          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
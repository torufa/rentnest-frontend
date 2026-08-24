import Image from "next/image";
import Link from "next/link";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";

import { getLandlordProperties } from "../_actions/landlord";
import { Button } from "@/components/ui/button";
import { LandlordProperty } from "@/lib/types";

export default async function LandlordPropertiesPage() {
  const res = await getLandlordProperties();

  const properties: LandlordProperty[] =
    res?.data?.result?.result ?? [];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">
            Landlord Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            My Properties
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage all properties you have listed on RentNest.
          </p>
        </div>

        <Button asChild>
          <Link href="/landlord/properties/create">
            <Plus className="mr-2 size-4" />
            Add Property
          </Link>
        </Button>
      </div>

      {!properties.length ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h2 className="text-lg font-semibold">
            No properties found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            You have not listed any properties yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {property.picture ? (
                  <img
                    src={property.picture}
                    alt={property.propertyName}
                    className="block size-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                  <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}

                <span className="absolute left-4 top-4 rounded-full border bg-background/90 px-3 py-1.5 text-xs font-medium backdrop-blur">
                  {property.status}
                </span>
              </div>

              <div className="p-5">
                <h2 className="line-clamp-1 text-lg font-semibold">
                  {property.propertyName}
                </h2>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {property.location}
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {property.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-primary">
                      ৳{property.price}
                    </span>

                    <span className="ml-1 text-xs text-muted-foreground">
                      / month
                    </span>
                  </div>

                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/properties/${property.id}`}>
                      View
                    </Link>
                  </Button>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link
                      href={`/landlord/properties/${property.id}/edit`}
                    >
                      <Pencil className="mr-2 size-4" />
                      Edit
                    </Link>
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    type="button"
                  >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
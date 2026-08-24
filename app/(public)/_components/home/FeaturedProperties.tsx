import Link from "next/link";
import { ArrowRight, Home, MapPin, Star } from "lucide-react";
import { getProperties } from "../../_actions/property";
import { Property } from "@/lib/types";
import Image from "next/image";

export default async function FeaturedProperties() {
  const res = await getProperties();
  const properties = res.data.result.property.slice(0, 3);
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              Featured properties
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Find a place that feels right
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Explore a few of the latest properties available on RentNest.
            </p>
          </div>

          <Link
            href="/properties"
            className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-primary sm:flex"
          >
            View all properties
            <ArrowRight className="size-4" />
          </Link>
        </div>

          <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-3">
            {properties.map((property: Property) => (
              <Link
                href={`/properties/${property.id}`}
                key={property.id}
                className="group overflow-hidden rounded-2xl border bg-background transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <div className="flex size-full items-center justify-center">
                    <img
                      src={property.picture || "https://images.unsplash.com/photo-1667021836621-ef302544b61f?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                      alt={property.propertyName}
                      className="block size-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <span className="absolute left-3 top-3 rounded-full border bg-background/90 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
                    {property.status}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-1 text-sm font-semibold group-hover:text-primary">
                    {property.propertyName}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {property.location}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-3">
                    <p>
                      <span className="font-semibold text-primary">
                        ৳{property.price}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {" "}
                        / month
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </section>
  );
}

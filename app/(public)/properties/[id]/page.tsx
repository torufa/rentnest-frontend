import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Star,
  Check,
} from "lucide-react";
import { getPropertyById } from "../../_actions/property";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getPropertyById(id);

  const property = res?.data?.result;

  if (!property) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-2xl font-bold">
          Property not found
        </h1>

        <Link
          href="/properties"
          className="mt-4 inline-flex items-center gap-2 text-sm text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to properties
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <Link
        href="/properties"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to properties
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          {property.picture ? (
            <Image
              src={property.picture}
              alt={property.propertyName}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}

          <span className="absolute left-4 top-4 rounded-full border bg-background/90 px-3 py-1.5 text-xs font-medium backdrop-blur">
            {property.status}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-primary">
            {property.category?.categoryName}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {property.propertyName}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {property.location}
          </div>

          <div className="mt-6">
            <span className="text-3xl font-bold text-primary">
              ৳{property.price}
            </span>

            <span className="ml-2 text-sm text-muted-foreground">
              / month
            </span>
          </div>

          <p className="mt-6 leading-7 text-muted-foreground">
            {property.description}
          </p>

          {/* Amenities */}
          <div className="mt-6">
            <h2 className="font-semibold">
              Amenities
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {property.amenities?.map(
                (amenity: string, index: number) => (
                  <span
                    key={`${amenity}-${index}`}
                    className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs"
                  >
                    <Check className="size-3.5 text-primary" />
                    {amenity}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Reviews
          </h2>

          <div className="flex items-center gap-1 text-sm">
            <Star className="size-4 fill-current" />

            {property.reviews?.length
              ? (
                  property.reviews.reduce(
                    (sum: number, review: any) =>
                      sum + review.rating,
                    0
                  ) / property.reviews.length
                ).toFixed(1)
              : "No ratings"}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {property.reviews?.map((review: any) => (
            <div
              key={review.id}
              className="rounded-xl border p-5"
            >
              <div className="flex items-center gap-1">
                {Array.from({
                  length: review.rating,
                }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-current"
                  />
                ))}
              </div>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {review.review}
              </p>
            </div>
          ))}

          {!property.reviews?.length && (
            <p className="text-sm text-muted-foreground">
              No reviews yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Star,
  Check,
  User,
  Mail,
  CalendarDays,
  ShieldCheck,
} from "lucide-react"

import { getPropertyById } from "../../_actions/property"
import { getMe } from "@/service/getMe"
import RentalRequestButton from "../../_components/properties/RentalRequestButton"
export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [propertyRes, userRes] = await Promise.all([
    getPropertyById(id),
    getMe(),
  ])

  const property = propertyRes?.data?.result
  const currentUser = userRes?.data?.result

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
    )
  }

  const isLoggedIn = userRes?.success === true
  const userRole = currentUser?.role ?? null
  const landlord = property.user

  const averageRating = property.reviews?.length
    ? (
        property.reviews.reduce(
          (sum: number, review: any) =>
            sum + review.rating,
          0,
        ) / property.reviews.length
      ).toFixed(1)
    : null

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

      {/* Back */}
      <Link
        href="/properties"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to properties
      </Link>

      {/* Property */}
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
                ),
              )}
            </div>
          </div>

          {/* Rental Request */}
          <RentalRequestButton
            propertyId={property.id}
            isLoggedIn={isLoggedIn}
            userRole={userRole}
          />
        </div>
      </div>

      {/* Landlord */}
      <section className="mt-16">
        <div className="mb-6">
          <p className="text-sm font-medium text-primary">
            Property Owner
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Landlord Information
          </h2>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* Avatar */}
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {landlord?.name?.charAt(0).toUpperCase() ?? "L"}
            </div>

            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold">
                  {landlord?.name}
                </h3>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <ShieldCheck className="size-3.5" />
                  {landlord?.role}
                </span>
              </div>

              <div className="mt-3 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">

                <div className="flex items-center gap-2">
                  <Mail className="size-4" />
                  {landlord?.email}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  Joined{" "}
                  {landlord?.createdAt
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(
                        new Date(landlord.createdAt),
                      )
                    : "N/A"}
                </div>

              </div>

              {landlord?.description && (
                <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                  {landlord.description}
                </p>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Reviews
          </h2>

          <div className="flex items-center gap-1 text-sm">
            <Star className="size-4 fill-current" />

            {averageRating ?? "No ratings"}
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
  )
}
import Link from "next/link"
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Home,
} from "lucide-react"

import { getMe } from "@/service/getMe"
import { getPropertyById } from "@/app/(public)/_actions/property"
import RentalRequestForm from "@/app/(public)/_components/properties/RentalRequestForm"

export default async function RentalRequestPage({
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
  const user = userRes?.data?.result

  if (!property) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
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

  if (!userRes?.success || !user) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-2xl font-bold">
          Login required
        </h1>

        <p className="mt-2 text-muted-foreground">
          You need to login as a tenant to submit a rental
          request.
        </p>

        <Link
          href={`/login?redirectTo=/properties/${id}/rental-request`}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go to Login
        </Link>
      </main>
    )
  }

  if (user.role !== "TENANT") {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-2xl font-bold">
          Rental request unavailable
        </h1>

        <p className="mt-2 text-muted-foreground">
          Only tenants can submit rental requests.
        </p>

        <Link
          href={`/properties/${id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to property
        </Link>
      </main>
    )
  }

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 lg:px-16">

        {/* Back */}
        <Link
          href={`/properties/${id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to property
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* Property Summary */}
          <div>
            <p className="text-sm font-medium text-primary">
              Rental Request
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Request to Rent
            </h1>

            <p className="mt-3 leading-7 text-muted-foreground">
              Submit your preferred rental dates for this
              property. The landlord will review your request.
            </p>

            {/* Property Card */}
            <div className="mt-8 overflow-hidden rounded-2xl border bg-card">

              {property.picture && (
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={property.picture}
                    alt={property.propertyName}
                    className="size-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-primary">
                      {property.category?.categoryName}
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      {property.propertyName}
                    </h2>
                  </div>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {property.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {property.location}
                </div>

                <div className="mt-4">
                  <span className="text-2xl font-bold text-primary">
                    ৳{property.price}
                  </span>

                  <span className="ml-1 text-sm text-muted-foreground">
                    / month
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div>
            <div className="sticky top-28 rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <Home className="size-5 text-primary" />

                  <h2 className="text-xl font-semibold">
                    Rental Details
                  </h2>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Hello {user.name}, select your rental period
                  below.
                </p>
              </div>

              <RentalRequestForm
                propertyId={property.id}
              />
            </div>
            {/* Request Info */}
            <div className="mt-6 rounded-xl border bg-muted/30 p-5">
              <div className="flex gap-3">
                <CalendarDays className="mt-0.5 size-5 shrink-0 text-primary" />

                <div>
                  <h3 className="font-medium">
                    Rental Period
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Choose the date you want to move in and
                    the date your rental period should end.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
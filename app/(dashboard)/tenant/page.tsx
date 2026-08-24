import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  CreditCard,
  MessageSquareText,
  Search,
} from "lucide-react";
import { getTenantRentalRequests } from "./_actions/tenant";
import { getReviews } from "./_actions/review";
export default async function TenantDashboardPage() {
  const [requestsResponse, reviewsResponse] =
    await Promise.all([
      getTenantRentalRequests(),
      getReviews(),
    ]);

  const requests = requestsResponse?.data?.result?.result?.rentalRequests ?? [];

  const reviews = reviewsResponse?.data?.result?.result?.reviews ?? [];
  const reviewsLenght = reviewsResponse?.data?.result?.total ?? [];

  const paidRequests = requests.filter(
    (request: { status: string }) =>
      request.status === "PAID",
  );

  const stats = [
    {
      title: "Rental Requests",
      value: requests.length,
      description: "Total requests submitted",
      icon: ClipboardList,
      href: "/tenant/requests",
    },
    {
      title: "Active Rentals",
      value: paidRequests.length,
      description: "Approved and paid rentals",
      icon: CreditCard,
      href: "/tenant/requests",
    },
    {
      title: "Reviews",
      value: reviewsLenght,
      description: "Reviews you have shared",
      icon: MessageSquareText,
      href: "/tenant/requests/reviews",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Tenant Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Welcome back!
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage your rental requests, payments, and reviews
          from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="group rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>

                <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-1" />
              </div>

              <div className="mt-5">
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          Quick Actions
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/properties"
            className="group rounded-2xl border p-6 transition hover:bg-muted/40"
          >
            <Search className="size-5 text-primary" />

            <h3 className="mt-4 font-semibold">
              Find a Property
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Browse available properties and find your
              next home.
            </p>

            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
              Browse Properties
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/tenant/requests"
            className="group rounded-2xl border p-6 transition hover:bg-muted/40"
          >
            <ClipboardList className="size-5 text-primary" />

            <h3 className="mt-4 font-semibold">
              My Rental Requests
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Track the status of your rental requests.
            </p>

            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
              View Requests
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/tenant/requests/reviews"
            className="group rounded-2xl border p-6 transition hover:bg-muted/40"
          >
            <MessageSquareText className="size-5 text-primary" />

            <h3 className="mt-4 font-semibold">
              Review History
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              See the reviews you have submitted.
            </p>

            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
              View Reviews
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
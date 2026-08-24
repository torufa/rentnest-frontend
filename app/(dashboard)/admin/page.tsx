import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ClipboardList,
  Users,
} from "lucide-react";
import { getAdminProperties, getAdminRentals, getAdminUsers } from "./_actions/admin";


export default async function AdminDashboardPage() {
  const [usersResponse, propertiesResponse, rentalsResponse] =
    await Promise.all([
      getAdminUsers(),
      getAdminProperties(),
      getAdminRentals(),
    ]);

  const users = usersResponse?.data?.result?.users ?? [];
  const properties = propertiesResponse?.data?.result?.properties ?? [];
  const rentals = rentalsResponse?.data?.result?.RentalRequests ?? [];
  console.log(rentalsResponse, "kldfksdlsdkjfds")

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      description: "Registered users",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Total Properties",
      value: properties.length,
      description: "Listed properties",
      icon: Building2,
      href: "/admin/properties",
    },
    {
      title: "Rental Requests",
      value: rentals.length,
      description: "Total rental requests",
      icon: ClipboardList,
      href: "/admin/rentals",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Admin Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Overview
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage users, properties, and rental requests
          from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="group rounded-2xl border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>

                <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-1" />
              </div>

              <div className="mt-6">
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

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/users"
            className="rounded-2xl border p-5 transition hover:bg-muted/40"
          >
            <Users className="size-5 text-primary" />

            <h3 className="mt-4 font-semibold">
              Manage Users
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              View and update user account status.
            </p>
          </Link>

          <Link
            href="/admin/properties"
            className="rounded-2xl border p-5 transition hover:bg-muted/40"
          >
            <Building2 className="size-5 text-primary" />

            <h3 className="mt-4 font-semibold">
              View Properties
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Browse all listed properties.
            </p>
          </Link>

          <Link
            href="/admin/rentals"
            className="rounded-2xl border p-5 transition hover:bg-muted/40"
          >
            <ClipboardList className="size-5 text-primary" />

            <h3 className="mt-4 font-semibold">
              Rental Requests
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Review all rental requests.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
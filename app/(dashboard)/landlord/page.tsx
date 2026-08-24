import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Home,
  Plus,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  getLandlordProperties,
  getLandlordRentalRequests,
} from "./_actions/landlord";

import type {
  LandlordProperty,
  LandlordRentalRequest,
} from "@/lib/types";

export default async function LandlordDashboardPage() {
  const [propertiesRes, requestsRes] =
    await Promise.all([
      getLandlordProperties(),
      getLandlordRentalRequests(),
    ]);

  const properties: LandlordProperty[] =
    propertiesRes?.data?.result?.result ?? [];

  const requests: LandlordRentalRequest[] =
    requestsRes?.data?.result?.result ?? [];

  const totalProperties = properties.length;

  const availableProperties = properties.filter(
    (property) => property.status === "AVAILABLE",
  ).length;



  const pendingRequests = requests.filter(
    (request) => request.status === "PENDING",
  ).length;

  const recentProperties = [...properties]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const recentRequests = [...requests]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">
            Landlord Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Overview
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your properties and rental requests
            from one place.
          </p>
        </div>

        <Button asChild>
          <Link href="/landlord/properties/create">
            <Plus className="mr-2 size-4" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Property Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Properties"
          value={totalProperties}
          icon={Building2}
          description="Properties you have listed"
        />

        <StatCard
          title="Available"
          value={availableProperties}
          icon={CheckCircle2}
          description="Currently available"
        />
      </div>

      {/* Recent Section */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Quickly access your landlord tools.
            </p>
          </CardHeader>

          <CardContent className="grid gap-3 sm:grid-cols-2">
            <QuickAction
              href="/landlord/properties/create"
              title="Add Property"
              description="Create a new listing"
              icon={Plus}
            />

            <QuickAction
              href="/landlord/properties"
              title="My Properties"
              description="Manage your listings"
              icon={Building2}
            />

            <QuickAction
              href="/landlord/requests"
              title="Rental Requests"
              description="Review tenant requests"
              icon={Clock3}
            />

          </CardContent>
        </Card>
      </div>

      {/* Recent Properties */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Properties</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Your latest property listings.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href="/landlord/properties">
              View all
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          {!recentProperties.length ? (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground">
                You have not listed any properties yet.
              </p>

              <Button
                asChild
                size="sm"
                className="mt-4"
              >
                <Link href="/landlord/properties/create">
                  <Plus className="mr-2 size-4" />
                  Add Property
                </Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {recentProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {property.propertyName}
                    </p>

                    <p className="truncate text-sm text-muted-foreground">
                      {property.location}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        ৳{property.price}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        / month
                      </p>
                    </div>

                    <PropertyStatus
                      status={property.status}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

/* -------------------------------- */
/* Stat Card */
/* -------------------------------- */

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
};

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <Icon className="size-5 text-muted-foreground" />
        </div>

        <p className="mt-3 text-3xl font-bold">
          {value}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

/* -------------------------------- */
/* Property Status */
/* -------------------------------- */

function PropertyStatus({
  status,
}: {
  status: string;
}) {
  const styles = {
    AVAILABLE:
      "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
    RENTED:
      "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    UNAVAILABLE:
      "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-medium ${
        styles[status as keyof typeof styles] ??
        "border-muted bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}

/* -------------------------------- */
/* Request Status */
/* -------------------------------- */

function RequestStatus({
  status,
}: {
  status: string;
}) {
  const styles = {
    PENDING:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    APPROVED:
      "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
    REJECTED:
      "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    PAID:
      "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  };

  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
        styles[status as keyof typeof styles] ??
        "border-muted bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}

/* -------------------------------- */
/* Quick Action */
/* -------------------------------- */

type QuickActionProps = {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

function QuickAction({
  href,
  title,
  description,
  icon: Icon,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border p-4 transition-colors hover:bg-muted/50"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="font-medium group-hover:text-primary">
            {title}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
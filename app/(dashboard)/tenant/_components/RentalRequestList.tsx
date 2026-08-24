import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { TenantRentalRequest } from "@/lib/types";

import RentalRequestCard from "./RentalRequestCard";

type RentalRequestListProps = {
  requests: TenantRentalRequest[];
};

export default function RentalRequestList({
  requests,
}: RentalRequestListProps) {
  if (!requests.length) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
          <Home className="size-6 text-muted-foreground" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          No rental requests yet
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          You have not submitted any rental requests yet.
          Browse available properties and find your next
          home.
        </p>

        <Button asChild className="mt-6">
          <Link href="/properties">
            Browse Properties
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {requests.map((request) => (
        <RentalRequestCard
          key={request.id}
          request={request}
        />
      ))}
    </div>
  );
}
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getTenantRentalRequest } from "@/app/(dashboard)/tenant/_actions/tenant";
import ReviewForm from "@/app/(dashboard)/tenant/_components/ReviewForm";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RentalRequestReviewPage({
  params,
}: PageProps) {
  const { id } = await params;

  const res = await getTenantRentalRequest(id);
  const request = res?.data?.result;

  if (!request) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-bold">
          Rental request not found
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/tenant/requests">
          <ArrowLeft className="mr-2 size-4" />
          Back to Requests
        </Link>
      </Button>

      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Tenant Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Leave a Review
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Share your experience with this property.
        </p>
      </div>

      {request.status === "PAID" && request.property ? (
        <ReviewForm
          rentalRequestId={request.id}
          property={request.property}
        />
      ) : (
        <div className="rounded-2xl border border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold">
            Review unavailable
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            You can only review a property after completing
            the payment.
          </p>
        </div>
      )}
    </main>
  );
}
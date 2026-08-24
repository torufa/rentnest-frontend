import { getTenantRentalRequest } from "../../_actions/tenant";

import RentalRequestDetails from "../../_components/RentalRequestDetails";

import type { TenantRentalRequest } from "@/lib/types";

type RentalRequestDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RentalRequestDetailsPage({
  params,
}: RentalRequestDetailsPageProps) {
  const { id } = await params;

  const res = await getTenantRentalRequest(id);

  const request: TenantRentalRequest | null =
    res?.data?.result ?? null;

  if (!request) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-10 lg:px-8">
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h1 className="text-xl font-semibold">
            Rental request not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The rental request you are looking for does not
            exist or is no longer available.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 lg:px-8">
      <RentalRequestDetails request={request} />
    </main>
  );
}
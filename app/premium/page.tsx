import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type PremiumPageProps = {
  searchParams: Promise<{
    success?: string;
  }>;
};

export default async function PremiumPage({
  searchParams,
}: PremiumPageProps) {
  const { success } = await searchParams;

  if (success !== "true") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Payment was cancelled
          </h1>

          <p className="mt-2 text-muted-foreground">
            Your payment was not completed.
          </p>

          <Button asChild className="mt-6">
            <Link href="/tenant/requests">
              Back to Rental Requests
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="size-9 text-green-600" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Payment Successful!
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your payment has been completed successfully.
          Your rental request is now confirmed.
        </p>

        <Button asChild className="mt-6">
          <Link href="/tenant/requests">
            View Rental History
          </Link>
        </Button>
      </div>
    </main>
  );
}
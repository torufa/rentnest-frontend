import Link from "next/link";
import { CreditCard, MapPin, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getTenantPayments } from "../_actions/payment";
import type { TenantPayment } from "@/lib/types";

export default async function TenantPaymentsPage() {
  const res = await getTenantPayments();

  const payments: TenantPayment[] =
    res?.data?.payment ?? [];

  if (!payments.length) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <CreditCard className="mx-auto size-10 text-muted-foreground" />

          <h1 className="mt-4 text-xl font-semibold">
            No payment history
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            You have not made any payments yet.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Tenant Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Payment History
        </h1>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <Card key={payment.id}>
            <CardContent className="flex flex-col gap-5 p-5 sm:flex-row">
              <img
                src={payment.rental.property.picture}
                alt={payment.rental.property.propertyName}
                className="h-32 w-full rounded-xl object-cover sm:w-44"
              />

              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {payment.rental.property.propertyName}
                      </h2>

                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-4" />
                        {payment.rental.property.location}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                      {payment.status}
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-bold text-primary">
                    ৳{payment.amount}
                  </p>
                </div>

                <Button asChild variant="outline" className="w-full sm:w-fit">
                  <Link href={`/tenant/payments/${payment.id}`}>
                    View Details
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
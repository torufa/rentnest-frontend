import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MapPin,
  Receipt,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getTenantPayment } from "../../_actions/payment";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export default async function PaymentDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const res = await getTenantPayment(id);

  const payment = res?.data ?? null;

  if (!payment) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h1 className="text-xl font-semibold">
            Payment not found
          </h1>

          <Button asChild className="mt-6">
            <Link href="/tenant/payments">
              Back to Payments
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const property = payment.rental.property;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-6"
      >
        <Link href="/tenant/payments">
          <ArrowLeft className="mr-2 size-4" />
          Back to Payments
        </Link>
      </Button>

      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Tenant Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Payment Details
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          View your payment and rental information.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Property */}
        <Card className="overflow-hidden lg:col-span-3">
          <div className="aspect-[16/10] overflow-hidden bg-muted">
            <img
              src={property.picture}
              alt={property.propertyName}
              className="size-full object-cover"
            />
          </div>

          <CardContent className="p-6">
            <h2 className="text-2xl font-bold">
              {property.propertyName}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {property.location}
            </p>

            <p className="mt-5 text-xl font-bold text-primary">
              ৳{property.price}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / month
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CreditCard className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Payment Information
                </h2>

                <p className="text-xs text-muted-foreground">
                  Payment #{payment.id.slice(0, 8)}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <InfoRow
                icon={Receipt}
                label="Amount"
                value={`৳${payment.amount}`}
              />

              <InfoRow
                icon={CreditCard}
                label="Method"
                value={payment.method}
              />

              <InfoRow
                icon={CheckCircle2}
                label="Status"
                value={payment.status}
              />

              {payment.paidAt && (
                <InfoRow
                  icon={CalendarDays}
                  label="Paid At"
                  value={formatDate(payment.paidAt)}
                />
              )}

              <InfoRow
                icon={Receipt}
                label="Transaction ID"
                value={payment.transactionId}
              />

              <InfoRow
                icon={Receipt}
                label="Rental Request"
                value={payment.rentalRequestId.slice(0, 8)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 break-all text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}
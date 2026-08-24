"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createRentalPayment } from "../_actions/payment";

type PaymentButtonProps = {
  rentalRequestId: string;
};

export default function PaymentButton({
  rentalRequestId,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      const res = await createRentalPayment(
        rentalRequestId,
      );

      if (!res?.success) {
        toast.error(
          res?.message || "Unable to create payment.",
        );
        return;
      }

      const paymentUrl =
        res?.data?.result?.paymentUrl;

      if (!paymentUrl) {
        toast.error("Payment URL was not generated.");
        return;
      }

      window.location.href = paymentUrl;
    } catch {
      toast.error(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      className="w-full"
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 size-4" />
          Pay Now
        </>
      )}
    </Button>
  );
}
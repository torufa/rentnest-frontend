"use client";

import { useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { updateRentalRequest } from "../../_actions/landlord";

type Props = {
  requestId: string;
  status: string;
};

export default function RentalRequestActions({
  requestId,
  status,
}: Props) {
  const [loading, setLoading] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);

  const handleUpdate = async (
    nextStatus: "APPROVED" | "REJECTED",
  ) => {
    try {
      setLoading(nextStatus);

      const res = await updateRentalRequest(
        requestId,
        nextStatus,
      );

      if (!res?.success) {
        toast.error(
          res?.message || "Failed to update rental request.",
        );

        return;
      }

      toast.success(
        nextStatus === "APPROVED"
          ? "Rental request approved successfully."
          : "Rental request rejected successfully.",
      );

      window.location.reload();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(null);
    }
  };

  if (status !== "PENDING") {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => handleUpdate("APPROVED")}
        disabled={loading !== null}
      >
        {loading === "APPROVED" ? (
          <Loader2 className="mr-1.5 size-4 animate-spin" />
        ) : (
          <Check className="mr-1.5 size-4" />
        )}

        Approve
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={() => handleUpdate("REJECTED")}
        disabled={loading !== null}
      >
        {loading === "REJECTED" ? (
          <Loader2 className="mr-1.5 size-4 animate-spin" />
        ) : (
          <X className="mr-1.5 size-4" />
        )}

        Reject
      </Button>
    </div>
  );
}
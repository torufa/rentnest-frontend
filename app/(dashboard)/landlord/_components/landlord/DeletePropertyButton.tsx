"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteLandlordProperty } from "../../_actions/landlord";


type DeletePropertyButtonProps = {
  propertyId: string;
};

export default function DeletePropertyButton({
  propertyId,
}: DeletePropertyButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const res = await deleteLandlordProperty(propertyId);

      if (!res?.success) {
        toast.error(
          res?.message || "Failed to delete property.",
        );
        return;
      }

      toast.success(
        res?.message || "Property deleted successfully.",
      );

      router.refresh();
    } catch {
      toast.error(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          type="button"
        >
          <Trash2 className="mr-2 size-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete this property?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. The property
            will be permanently removed from your listings.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
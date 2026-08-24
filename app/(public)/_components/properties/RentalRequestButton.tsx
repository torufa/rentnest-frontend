"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type RentalRequestButtonProps = {
  propertyId: string
  userRole?: string | null
  isLoggedIn: boolean
}

export default function RentalRequestButton({
  propertyId,
  userRole,
  isLoggedIn,
}: RentalRequestButtonProps) {
  const router = useRouter()

  const handleRentalRequest = () => {
    if (!isLoggedIn) {
      router.push(
        `/login?redirectTo=/properties/${propertyId}`,
      )
      return
    }

    if (userRole !== "TENANT") {
      toast.error("Only tenants can submit rental requests.")
      return
    }

    // Rental request page/action will be connected here
    router.push(`/properties/${propertyId}/rental-request`)
  }

  return (
    <Button
      size="lg"
      className="mt-6 w-full sm:w-auto"
      onClick={handleRentalRequest}
    >
      Request to Rent
    </Button>
  )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createRentalRequest } from "../../_actions/rentalRequests"


type RentalRequestFormProps = {
  propertyId: string
}

export default function RentalRequestForm({
  propertyId,
}: RentalRequestFormProps) {
  const router = useRouter()

  const [rentDate, setRentDate] = useState("")
  const [rentalExpiryDate, setRentalExpiryDate] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    if (!rentDate || !rentalExpiryDate) {
      toast.error("Please select both dates.")
      return
    }

    if (new Date(rentalExpiryDate) <= new Date(rentDate)) {
      toast.error(
        "Rental expiry date must be after the rent date.",
      )
      return
    }

    try {
      setLoading(true)

      const result = await createRentalRequest({
        propertyId,
        rentDate,
        rentalExpiryDate,
      })

      if (!result.success) {
        toast.error(
          result.message || "Failed to submit rental request.",
        )
        return
      }

      toast.success(
        "Rental request submitted successfully!",
      )

      router.push(`/properties/${propertyId}`)
      router.refresh()
    } catch {
      toast.error(
        "Something went wrong. Please try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Rent Date */}
      <div className="space-y-2">
        <Label htmlFor="rentDate">
          Rent Date
        </Label>

        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="rentDate"
            type="date"
            value={rentDate}
            onChange={(e) =>
              setRentDate(e.target.value)
            }
            className="pl-10"
            required
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Select the date you want to start renting.
        </p>
      </div>

      {/* Rental Expiry Date */}
      <div className="space-y-2">
        <Label htmlFor="rentalExpiryDate">
          Rental Expiry Date
        </Label>

        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="rentalExpiryDate"
            type="date"
            value={rentalExpiryDate}
            min={rentDate || undefined}
            onChange={(e) =>
              setRentalExpiryDate(e.target.value)
            }
            className="pl-10"
            required
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Select when the rental period should end.
        </p>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Submitting Request...
          </>
        ) : (
          "Submit Rental Request"
        )}
      </Button>
    </form>
  )
}
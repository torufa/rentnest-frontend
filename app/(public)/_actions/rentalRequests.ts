"use server"

import { cookies } from "next/headers"

export const createRentalRequest = async (data: {
  propertyId: string
  rentDate: string
  rentalExpiryDate: string
}) => {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in.",
    }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    },
  )

  const result = await res.json()

  return result
}
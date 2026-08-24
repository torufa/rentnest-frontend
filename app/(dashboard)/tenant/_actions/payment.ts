'use server'
import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Cookie: `accessToken=${accessToken}`,
  };
};

export const createRentalPayment = async (
  rentalRequestId: string,
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rentalRequestId,
      }),
      cache: "no-store",
    },
  );

  return res.json();
};
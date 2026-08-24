"use server";

import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Cookie: `accessToken=${accessToken}`,
  };
};

export const getTenantRentalRequests = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

export const getTenantRentalRequest = async (
  rentalId: string,
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/${rentalId}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};
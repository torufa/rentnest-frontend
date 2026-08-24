"use server";

import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Cookie: `accessToken=${accessToken}`,
  };
};

export const getLandlordProperties = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

export const getLandlordRentalRequests = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

export const updateRentalRequest = async (
  requestId: string,
  status: "APPROVED" | "REJECTED",
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
      cache: "no-store",
    },
  );

  return res.json();
};
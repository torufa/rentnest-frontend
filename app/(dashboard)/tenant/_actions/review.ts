"use server";

import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Cookie: `accessToken=${accessToken}`,
  };
};

export const createReview = async ({
  rentalRequestId,
  review,
  rating,
}: {
  rentalRequestId: string;
  review: string;
  rating: number;
}) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rentalRequestId,
        review,
        rating,
      }),
      cache: "no-store",
    },
  );

  return res.json();
};
export const getReviews = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    },
  );

  const result = await res.json();

  return result;
};
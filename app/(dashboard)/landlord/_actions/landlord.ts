"use server";

import { CreatePropertyData, UpdatePropertyData } from "@/lib/types";
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

export const getLandlordProperty = async (propertyId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

export const createLandlordProperty = async (
  data: CreatePropertyData,
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    },
  );

  return res.json();
};

export const updateLandlordProperty = async (
  propertyId: string,
  data: UpdatePropertyData,
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
    {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
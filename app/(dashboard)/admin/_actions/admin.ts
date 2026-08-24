'use server'
import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Cookie: `accessToken=${accessToken}`,
  };
};

const API_URL = process.env.BACKEND_API_URL;

export const getAdminUsers = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/api/admin/users`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  return res.json();
};

export const updateUserStatus = async (
  userId: string,
  status: string,
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    },
  );

  return res.json();
};

export const getAdminProperties = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/api/admin/properties`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  return res.json();
};

export const getAdminRentals = async () => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/api/admin/rentals`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  return res.json();
};
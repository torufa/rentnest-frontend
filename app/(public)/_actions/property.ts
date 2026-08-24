'use server'

export const getProperties = async() => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/`)
    const result = await res.json()
    return result
}

export const getAllProperties = async (
  query: string
) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/?${query}`
  );

  return res.json();
};

export const getPropertyById = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  return result;
};
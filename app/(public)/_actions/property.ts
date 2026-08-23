'use server'

export const getProperties = async() => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/`)
    const result = await res.json()
    return result
}
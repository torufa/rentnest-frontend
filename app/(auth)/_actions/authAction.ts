'use server'

import { LoginState, RegisterState } from "@/lib/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from "jsonwebtoken"

export const LoginAction = async(prevState: LoginState, formData: FormData) => {
    const email = formData.get('email')
    const password = formData.get('password')

    const payload = {
        email, password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`,{
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify(payload)
    })
    const result = await res.json()
    if(result.success && result.data){
        const cookieStore = await cookies();
        
        cookieStore.set('accessToken', result.data.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60*60*24
        })
        cookieStore.set('refreshToken', result.data.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60*60*24*7
        })
    }

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload
    if(decodedToken.role === "LANDLORD"){
            redirect("/landlord")
        }else if(decodedToken.role === "TENANT"){
            redirect("/tenant")
        }else if(decodedToken.role === "ADMIN"){
            redirect("/admin")
        }



    return result
}

export const RegisterAction = async(prevState: RegisterState, formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const role = formData.get('role')
    const description = formData.get('description')

    const payload = {
        name,
        email, 
        password,
        role,
        description
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`,{
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify(payload)
    })
    const result = await res.json()
    if(result.success && result.data && result.data.result){
        redirect('/login')
    }

    return result
}
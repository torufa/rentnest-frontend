'use client'

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginAction } from "../_actions/authAction"
import { useActionState, useEffect } from "react"
import Link from "next/link"
import { toast } from "sonner"

export function LoginForm() {
    const [state, action, pending] = useActionState(LoginAction, false)
    useEffect(()=>{
        if(!state){
            return
        }
        if(!state.success){
            toast.error(state.message)
        }else if(state.success){
            toast.success(state.message)
        }
    }, [state])

    
  return (
    <div className="flex flex-col gap-6">
        <form action={action}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name = 'email'
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input name='password' id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">
                    {pending ? "Submitting" : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
      
    </div>
  )
}

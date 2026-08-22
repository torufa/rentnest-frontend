"use client"

import Link from "next/link"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RegisterAction } from "../_actions/authAction"

export default function RegisterForm() {
  const [state, action, pending] = useActionState(RegisterAction,false)

  useEffect(() => {
    if (!state?.message) return

    if (state.success) {
      toast.success(state.message)
    } else if(!state.success) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className="w-full max-w-2xl">
      <form action={action}>
        <FieldGroup className="gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="name">
                Name
              </FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="h-11"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">
                Email
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">
                Password
              </FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                required
                className="h-11"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="role">
                I want to
              </FieldLabel>

              <Select name="role" required>
                <SelectTrigger
                  id="role"
                  className="h-11 w-full"
                >
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="TENANT">
                    Rent a property
                  </SelectItem>

                  <SelectItem value="LANDLORD">
                    List a property
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

          </div>

          <Field>
            <FieldLabel htmlFor="description">
              About you
            </FieldLabel>

            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Tell us a little about yourself"
              className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-20 w-full resize-none rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-[3px]"
            />
          </Field>

          <Field className="pt-1">
            <Button
              type="submit"
              className="h-11 w-full"
              disabled={pending}
            >
              {pending
                ? "Creating account..."
                : "Create account"}
            </Button>

            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign in
              </Link>
            </FieldDescription>
          </Field>

        </FieldGroup>
      </form>
    </div>
  )
}
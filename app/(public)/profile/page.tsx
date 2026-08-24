import { redirect } from "next/navigation"
import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  BadgeCheck,
  FileText,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

import { getMe } from "@/service/getMe"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const dashboardPaths = {
  ADMIN: "/admin",
  LANDLORD: "/landlord",
  TENANT: "/tenant",
} as const

export default async function ProfilePage() {
  const user = await getMe()

  if (!user.success || !user.data?.result) {
    redirect("/login")
  }

  const userData = user.data.result

  const dashboardPath =
    dashboardPaths[
      userData.role as keyof typeof dashboardPaths
    ] ?? "/"

  const getInitial = () => {
    if (userData.name) {
      return userData.name.charAt(0).toUpperCase()
    }

    if (userData.email) {
      return userData.email.charAt(0).toUpperCase()
    }

    return "U"
  }

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 lg:px-16">

        {/* Page Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-primary">
            Account
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            View your account information and profile details.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* Profile Summary */}
          <Card className="h-fit">
            <CardContent className="flex flex-col items-center px-6 py-8 text-center">

              {/* Avatar */}
              <div className="mb-5 flex size-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground shadow-lg">
                {getInitial()}
              </div>

              <h2 className="text-xl font-semibold">
                {userData.name}
              </h2>

              <p className="mt-1 break-all text-sm text-muted-foreground">
                {userData.email}
              </p>

              {/* Role */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <BadgeCheck className="size-3.5" />
                {userData.role}
              </div>

              {/* Account Status */}
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-600 dark:text-green-400">
                <ShieldCheck className="size-3.5" />
                {userData.accountStatus}
              </div>

              {/* Dashboard Button */}
              <Button asChild className="mt-6 w-full">
                <Link href={dashboardPath}>
                  Go to Dashboard
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="space-y-6">

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="size-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-5 sm:grid-cols-2">

                {/* Name */}
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="size-4" />
                    Full Name
                  </div>

                  <p className="font-medium">
                    {userData.name || "Not provided"}
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4" />
                    Email Address
                  </div>

                  <p className="break-all font-medium">
                    {userData.email || "Not provided"}
                  </p>
                </div>

                {/* Role */}
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="size-4" />
                    Account Role
                  </div>

                  <p className="font-medium">
                    {userData.role || "Not assigned"}
                  </p>
                </div>

                {/* Status */}
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <BadgeCheck className="size-4" />
                    Account Status
                  </div>

                  <p className="font-medium">
                    {userData.accountStatus || "Unknown"}
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5 text-primary" />
                  About
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  {userData.description || "No description provided."}
                </p>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="size-5 text-primary" />
                  Account Information
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-5 sm:grid-cols-2">

                {/* Created At */}
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">
                    Member Since
                  </p>

                  <p className="mt-1 font-medium">
                    {formatDate(userData.createdAt)}
                  </p>
                </div>

                {/* Updated At */}
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">
                    Last Updated
                  </p>

                  <p className="mt-1 font-medium">
                    {formatDate(userData.updatedAt)}
                  </p>
                </div>

                {/* User ID */}
                <div className="rounded-xl border bg-muted/30 p-4 sm:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    User ID
                  </p>

                  <p className="mt-1 break-all font-mono text-sm">
                    {userData.id}
                  </p>
                </div>

              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </main>
  )
}
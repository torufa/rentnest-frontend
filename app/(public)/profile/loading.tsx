import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProfileLoading() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 lg:px-16">

        {/* Page Header */}
        <div className="mb-10">
          <Skeleton className="mb-3 h-4 w-16" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="mt-3 h-5 w-80 max-w-full" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* Profile Summary */}
          <Card className="h-fit">
            <CardContent className="flex flex-col items-center px-6 py-8">

              {/* Avatar */}
              <Skeleton className="mb-5 size-24 rounded-full" />

              {/* Name */}
              <Skeleton className="h-6 w-32" />

              {/* Email */}
              <Skeleton className="mt-2 h-4 w-40" />

              {/* Role */}
              <Skeleton className="mt-4 h-7 w-20 rounded-full" />

              {/* Status */}
              <Skeleton className="mt-3 h-7 w-24 rounded-full" />

              {/* Dashboard Button */}
              <Skeleton className="mt-6 h-10 w-full rounded-md" />
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="space-y-6">

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-52" />
              </CardHeader>

              <CardContent className="grid gap-5 sm:grid-cols-2">

                <div className="rounded-xl border p-4">
                  <Skeleton className="mb-3 h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>

                <div className="rounded-xl border p-4">
                  <Skeleton className="mb-3 h-4 w-28" />
                  <Skeleton className="h-5 w-44" />
                </div>

                <div className="rounded-xl border p-4">
                  <Skeleton className="mb-3 h-4 w-24" />
                  <Skeleton className="h-5 w-24" />
                </div>

                <div className="rounded-xl border p-4">
                  <Skeleton className="mb-3 h-4 w-28" />
                  <Skeleton className="h-5 w-24" />
                </div>

              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>

              <CardContent>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="mt-2 h-5 w-4/5" />
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-52" />
              </CardHeader>

              <CardContent className="grid gap-5 sm:grid-cols-2">

                <div className="rounded-xl border p-4">
                  <Skeleton className="mb-3 h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>

                <div className="rounded-xl border p-4">
                  <Skeleton className="mb-3 h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>

                <div className="rounded-xl border p-4 sm:col-span-2">
                  <Skeleton className="mb-3 h-4 w-16" />
                  <Skeleton className="h-5 w-full" />
                </div>

              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </main>
  )
}
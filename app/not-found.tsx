import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-center">
     
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative flex max-w-md flex-col items-center">
        <div className="relative mb-7">
          <div className="absolute inset-0 scale-150 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative flex size-20 items-center justify-center rounded-3xl border bg-background shadow-sm">
            <Home
              className="size-9 text-primary"
              strokeWidth={1.5}
            />
          </div>

          <span className="absolute -right-1 -top-1 size-3 rounded-full bg-primary" />
        </div>

        <p className="mb-3 text-sm font-medium tracking-[0.25em] text-primary">
          ERROR 404
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          This place doesn&apos;t exist.
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          Looks like you took a wrong turn. The page you&apos;re looking for
          has moved, disappeared, or never existed.
        </p>

        <Link
          href="/"
          className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-1"
          />
          Back to home
        </Link>
      </div>
    </main>
  )
}
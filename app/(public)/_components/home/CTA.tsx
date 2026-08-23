import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
        <div className="pointer-events-none absolute -right-32 -top-40 size-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <Sparkles className="mx-auto size-6" />

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to find your next home?
          </h2>

          <p className="mt-4 text-sm leading-6 opacity-80">
            Explore available properties and take the first step toward a
            place you&apos;ll love.
          </p>

          <Link
            href="/properties"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Browse properties
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
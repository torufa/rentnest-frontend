"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@rentnest.com",
    href: "mailto:hello@rentnest.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Dhaka, Bangladesh",
    href: "#",
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    
    setTimeout(() => {
      toast.success("Message sent successfully!")
      form.reset()
      setIsSubmitting(false)
    }, 600)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pb-16 pt-12 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Contact us
          </p>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Let&apos;s talk about
              <span className="block text-muted-foreground">
                your next home.
              </span>
            </h1>

            <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              Have a question about a property, rental request, or
              anything else? We&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-border px-6 py-12 sm:px-10 lg:border-b-0 lg:border-r lg:px-16 lg:py-16 xl:px-24">
            <h2 className="text-lg font-medium">
              Get in touch
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Reach out through any of the channels below. We&apos;ll
              get back to you as soon as possible.
            </p>

            <div className="mt-10 space-y-7">
              {contactInfo.map((item) => {
                const Icon = item.icon

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-center gap-4"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </span>

                    <span>
                      <span className="block text-xs text-muted-foreground">
                        {item.title}
                      </span>

                      <span className="mt-1 block text-sm font-medium">
                        {item.value}
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16 xl:px-24">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-foreground"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us a little more..."
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 disabled:pointer-events-none disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send message"}

                <span className="flex size-7 items-center justify-center rounded-full bg-primary-foreground/10">
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
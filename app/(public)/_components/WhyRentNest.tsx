import {
  CheckCircle2,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Easy to discover",
    description:
      "Search and explore properties without going through a complicated process.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable listings",
    description:
      "Find property information clearly presented so you can make better decisions.",
  },
  {
    icon: UserRound,
    title: "Built for both sides",
    description:
      "A simple rental experience for tenants and a practical platform for landlords.",
  },
  {
    icon: CheckCircle2,
    title: "Simple requests",
    description:
      "Send rental requests and keep track of your rental journey in one place.",
  },
]

export default function WhyRentNest() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-primary">
              Why RentNest
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Renting made a little easier.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              From discovering a property to sending a rental request,
              RentNest keeps the experience straightforward for everyone.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border bg-background p-5 transition-colors hover:border-primary/30"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 text-sm font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
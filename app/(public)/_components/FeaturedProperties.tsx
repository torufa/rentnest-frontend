import Link from "next/link"
import {
  ArrowRight,
  Home,
  MapPin,
  Star,
} from "lucide-react"

//GET /api/properties?limit=3
//const properties = (await getProperties()).slice(0, 3)
const properties = [
  {
    id: "1",
    title: "Modern 2 Bedroom Apartment",
    location: "Dhanmondi, Dhaka",
    price: "25,000",
    type: "Apartment",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Spacious Family Home",
    location: "Uttara, Dhaka",
    price: "32,000",
    type: "House",
    rating: 4.9,
  },
  {
    id: "3",
    title: "Cozy Studio Apartment",
    location: "Mirpur, Dhaka",
    price: "15,000",
    type: "Studio",
    rating: 4.7,
  }
]

export default function FeaturedProperties() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              Featured properties
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Find a place that feels right
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Explore a few of the latest properties available on RentNest.
            </p>
          </div>

          <Link
            href="/properties"
            className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-primary sm:flex"
          >
            View all properties
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-3">
          {properties.map((property) => (
            <Link
              href={`/properties/${property.id}`}
              key={property.id}
              className="group overflow-hidden rounded-2xl border bg-background transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* img */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <div className="flex size-full items-center justify-center">
                  <Home className="size-14 text-muted-foreground/10 transition-transform duration-500 group-hover:scale-110" />
                </div>

                <span className="absolute left-3 top-3 rounded-full border bg-background/90 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
                  {property.type}
                </span>
              </div>

              {/* content */}
              <div className="p-4">
                <h3 className="line-clamp-1 text-sm font-semibold group-hover:text-primary">
                  {property.title}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {property.location}
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-3">
                  <p>
                    <span className="font-semibold text-primary">
                      ৳{property.price}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {" "}
                      / month
                    </span>
                  </p>

                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/properties"
          className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-xl border bg-background px-5 py-2.5 text-sm font-medium sm:hidden"
        >
          View all properties
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
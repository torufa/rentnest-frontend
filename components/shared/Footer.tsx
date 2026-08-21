import Link from "next/link"

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Properties", href: "/properties" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "About Us", href: "/about" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16 xl:px-24">
        <p>
          © {new Date().getFullYear()} RentNest. All rights reserved.
        </p>

        <p>
          Made for better renting.
        </p>
      </div>
    </footer>
  )
}
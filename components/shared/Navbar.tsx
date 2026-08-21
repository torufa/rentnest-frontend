"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LogOut,
  LayoutDashboard,
  User,
  Menu,
  X,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ModeToggle } from "../ui/ModeToggle"

type UserRole = "tenant" | "landlord" | "admin"

interface NavbarProps {
  role?: UserRole
}

const roleInitial: Record<UserRole, string> = {
  tenant: "T",
  landlord: "L",
  admin: "A",
}

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Properties",
    href: "/properties",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
]

export default function Navbar({
  role = "landlord",
}: NavbarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const initial = roleInitial[role]

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }

    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="border-b bg-background/75 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-24">

          <Link
            href="/"
            onClick={closeMobileMenu}
            className="text-xl font-semibold tracking-tight"
          >
            Rent<span className="text-primary">Nest</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {item.label}

                  {active && (
                    <span className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-5 rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open profile menu"
                  className="flex size-10 items-center justify-center rounded-full border bg-background/60 text-sm font-semibold shadow-sm backdrop-blur-md transition-all hover:border-primary/40 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {initial}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-48 rounded-xl border bg-popover/95 p-1.5 shadow-xl backdrop-blur-xl"
              >
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer rounded-lg"
                >
                  <Link href="/profile">
                    <User className="mr-2 size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer rounded-lg"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer rounded-lg text-destructive focus:text-destructive">
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              onClick={() =>
                setMobileMenuOpen((open) => !open)
              }
              className="flex size-10 items-center justify-center rounded-full border bg-background/60 backdrop-blur-md transition-colors hover:bg-muted md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t bg-background/90 px-6 py-4 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex max-w-[1600px] flex-col gap-1 sm:px-4">
              {navItems.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-10 rounded-full border border-border/50 bg-background/50"
        aria-label="Toggle theme placeholder"
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="group relative size-10 overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/5 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Sun className="relative size-4 rotate-0 scale-100 text-primary transition-all duration-500 ease-out dark:-rotate-90 dark:scale-0 group-hover:rotate-45" />

      <Moon className="absolute size-4 rotate-90 scale-0 text-primary transition-all duration-500 ease-out dark:rotate-0 dark:scale-100 group-hover:-rotate-12" />
    </Button>
  )
}
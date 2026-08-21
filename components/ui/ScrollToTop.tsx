"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed right-6 bottom-6 z-50 flex size-11 items-center justify-center rounded-full border bg-background/80 text-foreground shadow-lg backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 sm:right-8 sm:bottom-8"
    >
      <ArrowUp className="size-4" />
    </button>
  )
}
"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/hero1.jpg",
  },
  {
    id: 2,
    image: "/hero2.jpg",
  },
  {
    id: 3,
    image: "/hero4.jpg",
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    )
  }

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    )
  }

  return (
    <section className="h-lvh overflow-hidden">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center border-r bg-[#73b7b138] px-8 py-12 sm:px-12 md:px-16 lg:px-14 xl:px-24 dark:bg-[#182525]">
          <div className="max-w-xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-primary">
              A better way to rent
            </p>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl xl:text-[5.5rem]">
              Find a place
              <br />
              <span className="text-muted-foreground">
                that feels like home.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              Discover beautiful rental homes and apartments in the places
              you want to live. Find a space that fits your lifestyle and
              feels right from the very beginning.
            </p>

            <Link
              href="/properties"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20"
            >
              Browse properties

              <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/10">
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>

        <div className="relative min-h-0 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === activeSlide
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt="Rental property"
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/[0.04] dark:bg-black/[0.12]" />

              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          ))}

          <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-9">
          
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous property"
              className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/15 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:text-black"
            >
              <ArrowLeft className="size-4" />
            </button>

            <div className="flex h-11 items-center gap-2 rounded-full border border-white/30 bg-black/15 px-4 shadow-lg backdrop-blur-md">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? "h-1.5 w-7 bg-white"
                      : "size-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next property"
              className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/15 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:text-black"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const banners = [
  {
    id: "fire-protection",
    headline: "Fire Protection Equipment",
    description:
      "High-performance proximity suits and protective equipment designed to shield firefighters from extreme heat, radiant energy, and hazardous fire environments.",
    cta: "Shop Fire Protection",
    href: "/categories/fire-protection",
    icon: Shield,
    accent: "bg-white/20",
    image: "/images/header/proximity-suit.webp",
    imageClass: "object-contain",
  },
  {
    id: "spill-response",
    headline: "Advance Spill Response Kits",
    description:
      "Complete spill kits and containment solutions designed for fast, effective response to oil, chemical, and hazardous material spills.",
    cta: "View Spill Kits",
    href: "/categories/spill-response",
    icon: Shield,
    accent: "bg-white/20",
    image: "/images/header/spill-kit-v2.webp",
  },
  {
    id: "eye-wash",
    headline: "Emergency Eye Wash Stations",
    description:
      "Reliable emergency eyewash solutions designed for rapid eye flushing and immediate response to chemical splashes, dust, and other workplace contaminants.",
    cta: "Explore Eye Wash",
    href: "/categories/eye-wash",
    icon: Eye,
    accent: "bg-white/20",
    image: "/images/header/unicare-lse-1b-v2.png",
  },
  {
    id: "snake-rescue",
    headline: "Snake Rescue Equipment",
    description:
      "Reliable snake rescue tools and protective equipment designed for safe handling, capture, and relocation of snakes in residential and high-risk environments.",
    cta: "Shop Snake Rescue",
    href: "/categories/snake-rescue",
    icon: Shield,
    accent: "bg-white/20",
    image: "/images/header/snake-rescue-kit.png",
  },
]

export function BannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <div
      className="relative w-full h-full min-h-[320px] lg:min-h-[420px] rounded-2xl overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {banners.map((b, i) => {
        const Icon = b.icon
        return (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            {b.image && (
              <Image
                src={b.image}
                alt={b.headline}
                fill
                priority={i === 0}
                className="object-contain"
              />
            )}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-10 lg:p-12">
              <div className="max-w-lg">
                <div
                  className={`w-14 h-14 rounded-xl ${b.accent} backdrop-blur-sm flex items-center justify-center mb-5`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  {b.headline}
                </h3>

                <p className="mt-6 text-2xl mt-3 text-white/90">
                  {b.description}
                </p>
              </div>

              <Button
                render={<Link href={b.href} />}
                size="lg"
                className="self-start bg-white text-black hover:bg-gray-100 px-4 py-6"
              >
                {b.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {banners.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white w-6"
                : "bg-white/40 w-2 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

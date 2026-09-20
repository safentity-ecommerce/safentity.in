"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { categories } from "@/lib/data"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function Categories() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const slider = sliderRef.current

    if (!slider) return

    const isAtStart = slider.scrollLeft <= 0
    const isAtEnd =
      slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1

    setCanScrollLeft(!isAtStart)
    setCanScrollRight(!isAtEnd)
  }

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider) return

    checkScroll()

    slider.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      slider.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const slideLeft = () => {
    sliderRef.current?.scrollBy({
      left: -450,
      behavior: "smooth",
    })
  }

  const slideRight = () => {
    sliderRef.current?.scrollBy({
      left: 450,
      behavior: "smooth",
    })
  }

  return (
    <section className="pb-24">
      <div className="container">
        <div className="relative">
          {canScrollLeft && (
            <button
              type="button"
              title="Scroll left"
              aria-label="Scroll left"
              onClick={slideLeft}
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center bg-[#373737] text-white transition-colors duration-100 hover:bg-black"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          {canScrollRight && (
            <button
              type="button"
              title="Scroll right"
              aria-label="Scroll right"
              onClick={slideRight}
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center bg-[#373737] text-white transition-colors duration-100 hover:bg-black"
            >
              <ArrowRight size={20} />
            </button>
          )}

          <div
            ref={sliderRef}
            className="flex gap-10 lg:gap-16 overflow-x-hidden px-2 py-2 scroll-smooth"
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="w-30 min-w-34 sm:w-32 sm:min-w-32 lg:w-34 lg:min-w-34 cursor-pointer transition-all duration-[0.15s] ease-in hover:outline-hover"
              >
                <Link
                  href={`/categories/${category.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain"
                      sizes="210px"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-center text-base font-bold">
                      {category.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

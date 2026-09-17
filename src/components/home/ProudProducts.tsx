"use client"

import { useMemo, useSyncExternalStore } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/products/ProductCard"
import { proudProducts } from "@/lib/data/products"
import type { Product } from "@/types"

function getRandomProducts(products: Product[], count: number) {
  const shuffled = [...products]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, count)
}

const emptySubscribe = () => () => {}

export function ProudProducts() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  const randomProducts = useMemo<Product[]>(
    () => (isClient ? getRandomProducts(proudProducts, 8) : []),
    [isClient],
  )

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-bold !mb-10">
            Products we are proud of
          </h2>

          {/* <Link
            href="/proudProducts"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-light transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link> */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {randomProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link
          href="/products"
          className="mt-8 flex items-center justify-center gap-1.5 text-lg font-medium text-brand hover:text-brand-light transition-colors"
        >
          View All Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Building2 } from "lucide-react"
import { allBrands } from "@/lib/data/brands"

export const metadata: Metadata = {
  title: "Brands | Safentity",
  description:
    "Shop industrial safety products from trusted brands including 3M, Honeywell, MSA Safety, Ansell, and RESQ.",
}

export default function BrandsPage() {
  return (
    <div className="container py-6 lg:py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Brands</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Shop by Brand</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Trusted brands in industrial safety
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {allBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-all duration-200 hover:shadow-sm hover:border-border/80"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted font-semibold transition-colors group-hover:bg-brand group-hover:text-white">
              {brand.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold leading-snug group-hover:text-brand transition-colors">
                {brand.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {brand.productCount} products
              </p>
            </div>
            <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  )
}

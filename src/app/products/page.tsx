import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/products/ProductCard"
import { proudProducts } from "@/lib/data/products"

export const metadata: Metadata = {
  title: "Products | Safentity",
  description:
    "Browse industrial safety products — lockout tagout kits, hearing protection, hand protection, and more.",
}

export default function ProductsPage() {
  return (
    <div className="container py-6 lg:py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Products</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">All Products</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {proudProducts.length} Products available
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {proudProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

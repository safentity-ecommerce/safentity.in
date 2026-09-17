import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Building2 } from "lucide-react"
import { ProductCard } from "@/components/products/ProductCard"
import { allBrands } from "@/lib/data/brands"
import { proudProducts } from "@/lib/data/products"

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const brand = allBrands.find((b) => b.slug === slug)
    if (!brand) return { title: "Brand not found" }
    return {
      title: `${brand.name} | Safentity`,
      description: `Shop ${brand.name} industrial safety products at Safentity.`,
    }
  })
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brand = allBrands.find((b) => b.slug === slug)

  if (!brand) {
    notFound()
  }

  const brandproudProducts = proudProducts.filter(
    (p) => p.brandSlug === brand.slug,
  )

  return (
    <div className="container py-6 lg:py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href="/brands"
          className="hover:text-foreground transition-colors"
        >
          Brands
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{brand.name}</span>
      </nav>

      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl font-bold">
          {brand.name[0]}
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">{brand.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {brandproudProducts.length} product
            {brandproudProducts.length === 1 ? "" : "s"} available
          </p>
        </div>
      </div>

      {brandproudProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {brandproudProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <Building2 className="h-10 w-10 text-muted-foreground" />
          <p className="font-medium">
            No products available for this brand yet
          </p>
          <p className="text-sm text-muted-foreground">
            Check back soon or{" "}
            <Link href="/brands" className="text-brand hover:text-brand-light">
              browse other brands
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}

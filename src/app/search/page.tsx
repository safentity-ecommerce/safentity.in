import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Package, Search, SearchX, Tags } from "lucide-react"
import { ProductCard } from "@/components/products/ProductCard"
import { Badge } from "@/components/ui/badge"
import { proudProducts } from "@/lib/data/products"
import { categories } from "@/lib/data/categories"

export const metadata: Metadata = {
  title: "Search results",
  description:
    "Search Safentity's catalog of industrial safety products and categories.",
}

function matchesProduct(
  product: (typeof proudProducts)[number],
  query: string,
) {
  const haystack = [
    product.name,
    product.description,
    product.sku,
    product.brand,
    product.category,
    ...product.certifications,
  ]
    .join(" ")
    .toLowerCase()
  return haystack.includes(query)
}

function matchesCategory(category: (typeof categories)[number], query: string) {
  const names = [
    category.name,
    category.description,
    ...category.children.map((child) => child.name),
  ]
    .join(" ")
    .toLowerCase()
  return names.includes(query)
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const params = await searchParams
  const raw = Array.isArray(params.q) ? params.q[0] : params.q
  const query = (raw ?? "").trim()
  const q = query.toLowerCase()

  const productResults = q
    ? proudProducts.filter((product) => matchesProduct(product, q))
    : []
  const categoryResults = q
    ? categories.filter((category) => matchesCategory(category, q))
    : []

  const totalResults = productResults.length + categoryResults.length

  return (
    <div className="container py-6 lg:py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Search</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Search results</h1>
        {q && (
          <p className="text-sm text-muted-foreground mt-1">
            {totalResults} result{totalResults === 1 ? "" : "s"} for &ldquo;
            {query}&rdquo;
          </p>
        )}
      </div>

      {!q ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <Search className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">
            Type a keyword above to search products and categories.
          </p>
        </div>
      ) : totalResults === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <p className="font-medium">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted-foreground">
            Try a different keyword, product name, SKU, brand, or standard.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {productResults.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Package className="h-5 w-5 text-brand" />
                Products
                <Badge variant="secondary">{productResults.length}</Badge>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {productResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {categoryResults.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Tags className="h-5 w-5 text-brand" />
                Categories
                <Badge variant="secondary">{categoryResults.length}</Badge>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryResults.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Tags className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium group-hover:text-brand transition-colors">
                        {category.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {category.productCount} products
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

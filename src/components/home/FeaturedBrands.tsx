import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { featuredBrands } from "@/lib/data/brands"

export function FeaturedBrands() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Featured Brands
            </h2>
            <p className="mt-2 text-muted-foreground">
              Trusted names in industrial safety
            </p>
          </div>
          <Link
            href="/brands"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-light transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-xl border bg-card hover:border-brand/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-3 group-hover:bg-brand/5 transition-colors">
                <span className="text-lg font-bold text-muted-foreground group-hover:text-brand transition-colors">
                  {brand.name[0]}
                </span>
              </div>
              <h3 className="text-sm font-semibold group-hover:text-brand transition-colors">
                {brand.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5">
                {brand.productCount} proudProducts
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/brands"
          className="mt-6 sm:hidden flex items-center justify-center gap-1.5 text-sm font-medium text-brand hover:text-brand-light transition-colors"
        >
          View All Brands <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

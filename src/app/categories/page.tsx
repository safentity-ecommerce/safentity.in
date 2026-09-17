import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Package } from "lucide-react"
import { categoryIcons } from "@/components/shared/Icons"
import { categories } from "@/lib/data/categories"

export const metadata: Metadata = {
  title: "Categories | Safentity",
  description:
    "Browse Safentity's industrial safety product categories — head, eye, respiratory, hand, foot, fall, and hearing protection plus safety signage.",
}

export default function CategoriesPage() {
  return (
    <div className="container py-6 lg:py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Categories</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Shop by Category</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {categories.length} industrial safety categories
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category.icon] ?? Package
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col gap-4 rounded-xl border bg-card p-5 transition-all duration-200 hover:shadow-sm hover:border-border/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-brand">
                <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-white" />
              </div>
              <div>
                <h2 className="font-semibold leading-snug group-hover:text-brand transition-colors">
                  {category.name}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.productCount} products
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  ChevronRight,
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { ProductCard } from "@/components/products/ProductCard"
import { categories } from "@/lib/data/categories"
import { proudProducts } from "@/lib/data/products"
import { cn, formatINR } from "@/lib/utils"

const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
  { label: "Rating", value: "rating" },
]

const brands = [
  "3M",
  "Honeywell",
  "MSA Safety",
  "Ansell",
  "Uvex",
  "Miller",
  "Kimberly-Clark",
]
const certifications = [
  "IS 2923",
  "ANSI Z89.1",
  "EN 397",
  "NIOSH N95",
  "EN 388",
  "ANSI Z87.1",
]

interface FilterContentProps {
  selectedBrands: string[]
  selectedCerts: string[]
  priceRange: number[]
  onToggleBrand: (brand: string) => void
  onToggleCert: (cert: string) => void
  onPriceChange: (value: number[]) => void
}

function FilterContent({
  selectedBrands,
  selectedCerts,
  priceRange,
  onToggleBrand,
  onToggleCert,
  onPriceChange,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => onToggleBrand(brand)}
                className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={(val) =>
            onPriceChange(Array.isArray(val) ? [...val] : [val])
          }
          max={50000}
          step={100}
          className="[&_[role=slider]]:border-brand [&_[role=slider]]:bg-brand"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {formatINR(priceRange[0])}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatINR(priceRange[1])}
          </span>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Certifications</h4>
        <div className="space-y-2">
          {certifications.map((cert) => (
            <label
              key={cert}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCerts.includes(cert)}
                onCheckedChange={() => onToggleCert(cert)}
                className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {cert}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Rating</h4>
        {[4, 3, 2, 1].map((rating) => (
          <label
            key={rating}
            className="flex items-center gap-2.5 py-1 cursor-pointer group"
          >
            <Checkbox className="data-[state=checked]:bg-brand data-[state=checked]:border-brand" />
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30",
                  )}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">& up</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default function CategoryPage() {
  const params = useParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCerts, setSelectedCerts] = useState<string[]>([])

  const category = categories.find((c) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const categoryproudProducts = proudProducts.filter(
    (p) => p.categorySlug === category.slug,
  )
  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCerts.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 50000

  const filteredproudProducts = categoryproudProducts.filter((p) => {
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(p.brand)
    const certMatch =
      selectedCerts.length === 0 ||
      p.certifications.some((cert) => selectedCerts.includes(cert))
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1]
    return brandMatch && certMatch && priceMatch
  })

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedCerts([])
    setPriceRange([0, 50000])
  }

  const isLoading = false

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    )
  }

  const toggleCert = (cert: string) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert],
    )
  }

  return (
    <div className="container py-6 lg:py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href="/categories"
          className="hover:text-foreground transition-colors"
        >
          Categories
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-base font-semibold mb-6">Filters</h3>
            <FilterContent
              selectedBrands={selectedBrands}
              selectedCerts={selectedCerts}
              priceRange={priceRange}
              onToggleBrand={toggleBrand}
              onToggleCert={toggleCert}
              onPriceChange={setPriceRange}
            />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                {category.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredproudProducts.length} products found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-md border border-input bg-background text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted h-7 gap-1 px-2.5">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <h3 className="text-base font-semibold mb-6">Filters</h3>
                  <FilterContent
                    selectedBrands={selectedBrands}
                    selectedCerts={selectedCerts}
                    priceRange={priceRange}
                    onToggleBrand={toggleBrand}
                    onToggleCert={toggleCert}
                    onPriceChange={setPriceRange}
                  />
                </SheetContent>
              </Sheet>

              <Select defaultValue="popularity">
                <SelectTrigger className="w-[160px] h-9 text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="hidden sm:flex items-center border rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    viewMode === "grid" ? "bg-muted" : "hover:bg-muted",
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    viewMode === "list" ? "bg-muted" : "hover:bg-muted",
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {(selectedBrands.length > 0 ||
            selectedCerts.length > 0 ||
            priceRange[0] > 0 ||
            priceRange[1] < 50000) && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {selectedBrands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border bg-muted"
                >
                  {brand}
                  <button
                    onClick={() => toggleBrand(brand)}
                    aria-label={`Remove ${brand} filter`}
                    className="hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedCerts.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border bg-muted"
                >
                  {cert}
                  <button
                    onClick={() => toggleCert(cert)}
                    aria-label={`Remove ${cert} filter`}
                    className="hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={clearFilters}
                className="text-xs text-brand hover:text-brand-light transition-colors ml-1"
              >
                Clear All
              </button>
            </div>
          )}

          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl border p-4">
                  <Skeleton className="aspect-square rounded-lg mb-3" />
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredproudProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">
                {hasActiveFilters
                  ? "No products match your filters"
                  : "No products in this category yet"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {hasActiveFilters
                  ? "Try adjusting or clearing your filters"
                  : "Check back soon or browse other categories"}
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}

          {!isLoading && filteredproudProducts.length > 0 && (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
                  : "space-y-3 sm:space-y-4",
              )}
            >
              {filteredproudProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode === "list" ? "compact" : "default"}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredproudProducts.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-brand text-white border-brand hover:bg-brand-dark"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="text-sm text-muted-foreground px-1">...</span>
              <Button variant="outline" size="sm">
                12
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

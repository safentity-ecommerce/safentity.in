"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Search,
  X,
  TrendingUp,
  Clock,
  Package,
  Tags,
  ArrowRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { proudProducts } from "@/lib/data/products"
import { categories } from "@/lib/data/categories"

const recentSearches = [
  "safety helmets IS 2923",
  "N95 respirators",
  "cut resistant gloves level 5",
  "safety shoes size 8",
]

const popularSearches = [
  "3M products",
  "Honeywell respirators",
  "fall protection harness",
  "safety glasses",
  "ear muffs",
]

const suggestedProducts = proudProducts.slice(0, 4).map((product) => ({
  name: product.name,
  type: "product" as const,
  href: `/products/${product.slug}`,
}))

const suggestedCategories = categories.slice(0, 4).map((category) => ({
  name: category.name,
  type: "category" as const,
  href: `/categories/${category.slug}`,
}))

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClear = useCallback(() => {
    setQuery("")
    inputRef.current?.focus()
  }, [])

  const showResults = isFocused && (query.length > 0 || isOpen)

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div
        className={cn(
          "relative flex h-11 items-center rounded-lg border bg-white transition-all duration-200",
          isFocused
            ? "border-gray-400 "
            : "border-gray-300  hover:border-gray-400",
        )}
      >
        <Search className="ml-4 h-5 w-5 shrink-0 text-gray-700" />

        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => {
            setIsFocused(true)
            setIsOpen(true)
          }}
          placeholder="Search products, brands, part numbers, SKU, IS standards..."
          className="h-full border-0 bg-transparent px-3 text-lg font-medium text-gray-700 shadow-none focus-visible:ring-0 placeholder:text-gray-500"
        />

        {query && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="mr-2 rounded-md p-1.5 transition-colors hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        )}

        <kbd className="mr-3 hidden items-center rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 md:inline-flex">
          /
        </kbd>
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in-0 slide-in-from-top-1 duration-150">
          <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
            {query ? (
              <div className="p-2 space-y-1">
                {suggestedProducts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <Package className="h-3.5 w-3.5" />
                      Products
                    </div>
                    {suggestedProducts.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground flex-shrink-0">
                          {item.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Product
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors" />
                      </a>
                    ))}
                  </div>
                )}
                {suggestedCategories.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <Tags className="h-3.5 w-3.5" />
                      Categories
                    </div>
                    {suggestedCategories.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted transition-colors group"
                      >
                        <Tags className="h-4 w-4 text-muted-foreground ml-1.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Category
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2">
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    <Clock className="h-3.5 w-3.5" />
                    Recent Searches
                  </div>
                  <div className="space-y-0.5">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                        onClick={() => setQuery(search)}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t my-1" />
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <button
                        key={search}
                        className="px-3 py-1.5 text-xs rounded-full border bg-muted/50 hover:bg-muted transition-colors"
                        onClick={() => setQuery(search)}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {query && (
              <div className="border-t px-3 py-2.5">
                <a
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-brand hover:text-brand-light transition-colors"
                >
                  <Search className="h-4 w-4" />
                  Search for &ldquo;{query}&rdquo;
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

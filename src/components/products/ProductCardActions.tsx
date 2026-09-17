"use client"

import { Heart, ShoppingCart, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface ProductCardActionsProps {
  product: Product
}

export function ProductCardActions({ product }: ProductCardActionsProps) {
  return (
    <>
      {product.stockStatus !== "out_of_stock" ? (
        <Button
          size="sm"
          className="flex-1 h-9 text-xs font-semibold bg-brand hover:bg-brand-dark text-white"
        >
          <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
          Add to Cart
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="flex-1 h-9 text-xs"
          disabled
        >
          Out of Stock
        </Button>
      )}
      {/* <Button
        size="sm"
        variant="outline"
        className="h-9 w-9 p-0"
        aria-label="Request a quote"
      >
        <FileText className="h-3.5 w-3.5" />
      </Button> */}
      {/* <Button
        size="sm"
        variant="outline"
        className="h-9 w-9 p-0"
        aria-label="Compare this product"
      >
        <BarChart3 className="h-3.5 w-3.5" />
      </Button> */}
    </>
  )
}

export function ProductWishlistButton() {
  return (
    <button
      type="button"
      aria-label="Add to wishlist"
      className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
    >
      <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
    </button>
  )
}

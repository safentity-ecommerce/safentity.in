import Link from "next/link"
import { Star, Truck } from "lucide-react"
import { cn, formatINR } from "@/lib/utils"
import type { Product } from "@/types"
import Image from "next/image"
import { ProductCardActions, ProductWishlistButton } from "./ProductCardActions"

interface ProductCardProps {
  product: Product
  variant?: "default" | "compact"
}

export function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const stockConfig = {
    in_stock: {
      label: "In Stock",
      class: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    low_stock: {
      label: "Low Stock",
      class: "text-amber-600 bg-amber-50 border-amber-200",
    },
    out_of_stock: {
      label: "Out of Stock",
      class: "text-red-600 bg-red-50 border-red-200",
    },
  }

  const stock = stockConfig[product.stockStatus] ?? stockConfig.in_stock
  const primaryImage = product.images?.[0]
  const isCompact = variant === "compact"

  return (
    <div className="group relative flex flex-col rounded-xl border bg-card transition-all duration-200 hover:shadow-sm hover:border-border/80">
      {/* Image */}
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-square bg-muted rounded-t-xl overflow-hidden"
        >
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-xl bg-muted-foreground/5 flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground/20">
                  {product.name[0]}
                </span>
              </div>
            </div>
          )}
          {/* {product.isNew && (
            <Badge className="absolute top-2 left-2 bg-brand text-white border-0 text-[10px] px-2 py-0.5 font-semibold">
              New
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="absolute top-2 left-2 bg-foreground text-white border-0 text-[10px] px-2 py-0.5 font-semibold">
              Best Seller
            </Badge>
          )} */}
        </Link>
        {/* <ProductWishlistButton /> */}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        {/* Brand */}
        <Link
          href={`/brands/${product.brandSlug}`}
          className="text-[11px] font-medium text-muted-foreground hover:text-brand transition-colors uppercase tracking-wider"
        >
          {product.brand}
        </Link>

        {/* Name */}
        <Link href={`/products/${product.slug}`} className="mt-0.5">
          <h3
            className={cn(
              "font-semibold leading-snug line-clamp-2 group-hover:text-brand transition-colors",
              isCompact ? "text-sm" : "text-sm sm:text-base",
            )}
          >
            {product.name}
          </h3>
        </Link>

        {/* SKU */}
        <p className="mt-1 text-[11px] text-muted-foreground/60 font-mono">
          SKU: {product.sku}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium ml-1">
              {product.rating ?? "–"}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            ({product.reviewCount ?? 0})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="text-lg font-bold">{formatINR(product.price)}</span>
        </div>

        {/* Stock & Delivery */}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={cn(
              "text-[10px] font-medium px-1.5 py-0.5 rounded border",
              stock.class,
            )}
          >
            {stock.label}
          </span>
          {product.deliveryBadge && (
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Truck className="h-3 w-3" />
              {product.deliveryBadge}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-3 flex items-center gap-2">
          <ProductCardActions product={product} />
        </div>
      </div>
    </div>
  )
}

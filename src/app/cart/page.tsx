"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Minus,
  Plus,
  Trash2,
  Heart,
  ShoppingBag,
  ArrowLeft,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/products/ProductCard"
import { proudProducts } from "@/lib/data/products"
import { cn, formatINR } from "@/lib/utils"
import { useCart } from "@/components/context/CartContext"

export default function CartPage() {
  const [promoCode, setPromoCode] = useState("")

  const { cartItems, updateQuantity, removeFromCart } = useCart()

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  const gst = Math.round(subtotal * 0.18)
  const shipping = subtotal >= 2000 ? 0 : 199
  const total = subtotal + gst + shipping

  return (
    <div className="container py-6 lg:py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      <h1 className="text-2xl lg:text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>

          <h3 className="text-lg font-semibold">Your cart is empty</h3>

          <p className="text-sm text-muted-foreground mt-1">
            Browse our products and add items to your cart
          </p>

          <Link href="/categories">
            <Button className="mt-4 bg-brand hover:bg-brand-dark text-white">
              Browse products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 p-4 rounded-xl border bg-card"
              >
                {/* Product Image */}
                <div className="w-24 h-24 rounded-lg bg-muted shrink-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-muted-foreground/20">
                    {product.name[0]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {product.brand}
                      </p>

                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm font-semibold hover:text-brand transition-colors line-clamp-1"
                      >
                        {product.name}
                      </Link>

                      <p className="text-xs text-muted-foreground/60 font-mono mt-0.5">
                        SKU: {product.sku}
                      </p>
                    </div>

                    <p className="text-base font-bold shrink-0">
                      {formatINR(product.price * quantity)}
                    </p>
                  </div>

                  {/* Quantity + Actions */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center border rounded-lg">
                      {/* Minus */}
                      <button
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            quantity - (product.moq || 1),
                          )
                        }
                        disabled={quantity <= (product.moq || 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="p-1.5 hover:bg-muted transition-colors disabled:opacity-50"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>

                      {/* Quantity */}
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const value =
                            parseInt(e.target.value) || product.moq || 1

                          updateQuantity(
                            product.id,
                            Math.max(product.moq || 1, value),
                          )
                        }}
                        className="w-14 text-center text-sm font-medium border-x bg-transparent py-1.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      {/* Plus */}
                      <button
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            quantity + (product.moq || 1),
                          )
                        }
                        aria-label={`Increase quantity of ${product.name}`}
                        className="p-1.5 hover:bg-muted transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Remove */}
                      <button
                        className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Wishlist */}
                      <button
                        className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                        aria-label={`Save ${product.name} to wishlist`}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-muted-foreground mt-1">
                    ₹{product.price}/unit | MOQ: {product.moq}
                  </p>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div className="flex items-center gap-2">
              <Input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="max-w-xs h-10 text-sm"
              />

              <Button variant="outline" size="sm" className="h-10">
                Apply
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-lg font-semibold">Order Summary</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>

                  <span className="font-medium">{formatINR(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>

                  <span className="font-medium">{formatINR(gst)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>

                  <span
                    className={cn(
                      "font-medium",
                      shipping === 0 && "text-emerald-600",
                    )}
                  >
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>

              <Link href="/checkout">
                <Button
                  size="lg"
                  className="w-full h-12 bg-brand hover:bg-brand-dark text-white font-semibold cursor-pointer"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <Shield className="h-3.5 w-3.5" />
                Secure checkout with SSL encryption
              </div>

              {/* Estimated Delivery */}
              <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  Estimated Delivery
                </p>

                <p>Standard: 3-5 business days</p>
                <p>Express: 1-2 business days</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended products */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-6">You May Also Need</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {proudProducts.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} variant="compact" />
          ))}
        </div>
      </section>
    </div>
  )
}

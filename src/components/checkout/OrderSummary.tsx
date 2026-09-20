"use client"

import { Separator } from "@/components/ui/separator"
import { formatINR } from "@/lib/utils"

interface OrderSummaryProps {
  cartItems: {
    product: any
    quantity: number
  }[]
  subtotal: number
  gst: number
  shipping: number
  total: number
}

export function OrderSummary({
  cartItems,
  subtotal,
  gst,
  shipping,
  total,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-2">
      <div className="sticky top-24 rounded-xl border bg-card p-6 space-y-4">
        <h3 className="text-base font-semibold">Order Summary</h3>

        {/* Products */}
        <div className="space-y-3">
          {cartItems.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex justify-between gap-3 text-sm"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{product.name}</p>

                <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
              </div>

              <span className="shrink-0">
                {formatINR(product.price * quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>

            <span>{formatINR(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">GST (18%)</span>

            <span>{formatINR(gst)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>

            <span className="text-emerald-600">
              {shipping === 0 ? "Free" : formatINR(shipping)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>

          <span>{formatINR(total)}</span>
        </div>
      </div>
    </div>
  )
}

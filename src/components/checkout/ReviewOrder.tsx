"use client"

import Link from "next/link"
import { Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

import { formatINR } from "@/lib/utils"

import type { BillingDetails, ShippingDetails } from "@/types/checkout"

interface ReviewOrderProps {
  shippingDetails: ShippingDetails
  billingDetails: BillingDetails
  sameAsShipping: boolean
  paymentMethod: string
  cartItems: {
    product: any
    quantity: number
  }[]
  total: number
  onEditShipping: () => void
  onEditPayment: () => void
}

export function ReviewOrder({
  shippingDetails,
  billingDetails,
  sameAsShipping,
  paymentMethod,
  cartItems,
  total,
  onEditShipping,
  onEditPayment,
}: ReviewOrderProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Review Your Order</h2>

      <div className="space-y-4">
        {/* Shipping Address */}
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Shipping To</span>

            <button
              type="button"
              className="text-xs text-brand cursor-pointer"
              onClick={onEditShipping}
            >
              Edit
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            {shippingDetails.fullName}
          </p>

          <p className="text-sm text-muted-foreground">
            {shippingDetails.addressLine1}
          </p>

          {shippingDetails.addressLine2 && (
            <p className="text-sm text-muted-foreground">
              {shippingDetails.addressLine2}
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            {shippingDetails.city}, {shippingDetails.state} -{" "}
            {shippingDetails.pincode}
          </p>

          <p className="text-sm text-muted-foreground">
            {shippingDetails.phone}
          </p>
        </div>

        {/* Billing Address */}
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Billing To</span>
          </div>

          {sameAsShipping ? (
            <p className="text-sm text-muted-foreground">
              Same as shipping address
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {billingDetails.companyName}
              </p>

              <p className="text-sm text-muted-foreground">
                {billingDetails.addressLine1}
              </p>

              {billingDetails.addressLine2 && (
                <p className="text-sm text-muted-foreground">
                  {billingDetails.addressLine2}
                </p>
              )}

              <p className="text-sm text-muted-foreground">
                {billingDetails.city}, {billingDetails.state} -{" "}
                {billingDetails.pincode}
              </p>

              {billingDetails.gstNumber && (
                <p className="text-sm text-muted-foreground">
                  GST: {billingDetails.gstNumber}
                </p>
              )}
            </>
          )}
        </div>

        {/* Payment */}
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Payment Method</span>

            <button
              type="button"
              className="text-xs text-brand cursor-pointer"
              onClick={onEditPayment}
            >
              Edit
            </button>
          </div>

          <p className="text-sm text-muted-foreground capitalize">
            {paymentMethod.replace("-", " ")}
          </p>
        </div>

        {/* Items */}
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Items</span>

            <Link href="/cart" className="text-xs text-brand">
              Edit
            </Link>
          </div>

          <div className="space-y-2">
            {cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex justify-between gap-4 text-sm text-muted-foreground"
              >
                <span className="min-w-0">
                  {product.name} × {quantity}
                </span>

                <span className="shrink-0">
                  {formatINR(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        type="button"
        size="lg"
        className="w-full h-12 bg-brand hover:bg-brand-dark text-white font-semibold cursor-pointer"
      >
        Place Order - {formatINR(total)}
      </Button>

      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
        <Shield className="h-3.5 w-3.5" />
        Your order is protected by SSL encryption
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onEditPayment}
        className="w-full cursor-pointer"
      >
        Back to Payment
      </Button>
    </div>
  )
}

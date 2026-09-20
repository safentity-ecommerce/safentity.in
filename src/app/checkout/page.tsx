"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useCart } from "@/components/context/CartContext"

import { CheckoutSteps } from "@/components/checkout/CheckoutSteps"
import { ShippingForm } from "@/components/checkout/ShippingForm"
import { BillingForm } from "@/components/checkout/BillingForm"
import { PaymentForm } from "@/components/checkout/PaymentForm"
import { ReviewOrder } from "@/components/checkout/ReviewOrder"
import { OrderSummary } from "@/components/checkout/OrderSummary"

import type {
  BillingDetails,
  CheckoutStep,
  ShippingDetails,
} from "@/types/checkout"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")

  const [paymentMethod, setPaymentMethod] = useState("card")

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [sameAsShipping, setSameAsShipping] = useState(true)

  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    companyName: "",
    gstNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  })

  const { cartItems } = useCart()

  /* --------------------------------
     ORDER TOTALS
  -------------------------------- */

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  const gst = subtotal * 0.18
  const shipping = 0
  const total = subtotal + gst + shipping

  /* --------------------------------
     EMPTY CART
  -------------------------------- */

  if (cartItems.length === 0) {
    return (
      <div className="container py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <CreditCard className="h-7 w-7 text-muted-foreground" />
          </div>

          <h1 className="text-2xl font-bold">Your cart is empty</h1>

          <p className="mt-2 text-muted-foreground">
            Add some products to your cart before proceeding to checkout.
          </p>

          <Link href="/products">
            <Button className="mt-6 bg-brand hover:bg-brand-dark text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 lg:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        {/* Page Title */}
        <h1 className="text-2xl lg:text-3xl font-bold mb-8">Checkout</h1>

        {/* Progress Steps */}
        <CheckoutSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border bg-card p-6">
              {/* SHIPPING */}

              {currentStep === "shipping" && (
                <ShippingForm
                  shippingDetails={shippingDetails}
                  setShippingDetails={setShippingDetails}
                  onContinue={() => setCurrentStep("billing")}
                />
              )}

              {/* BILLING */}

              {currentStep === "billing" && (
                <BillingForm
                  billingDetails={billingDetails}
                  setBillingDetails={setBillingDetails}
                  sameAsShipping={sameAsShipping}
                  setSameAsShipping={setSameAsShipping}
                  onBack={() => setCurrentStep("shipping")}
                  onContinue={() => setCurrentStep("payment")}
                />
              )}

              {/* PAYMENT */}

              {currentStep === "payment" && (
                <PaymentForm
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  onBack={() => setCurrentStep("billing")}
                  onContinue={() => setCurrentStep("review")}
                />
              )}

              {/* REVIEW */}

              {currentStep === "review" && (
                <ReviewOrder
                  shippingDetails={shippingDetails}
                  billingDetails={billingDetails}
                  sameAsShipping={sameAsShipping}
                  paymentMethod={paymentMethod}
                  cartItems={cartItems}
                  total={total}
                  onEditShipping={() => setCurrentStep("shipping")}
                  onEditPayment={() => setCurrentStep("payment")}
                />
              )}
            </div>
          </div>

          {/* ORDER SUMMARY */}

          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            gst={gst}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}

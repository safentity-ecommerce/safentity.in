"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Shield, ArrowLeft, CreditCard, Truck, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const steps = [
  { id: "shipping", label: "Shipping" },
  { id: "billing", label: "Billing" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("shipping")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const currentIndex = steps.findIndex((s) => s.id === currentStep)

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

        <h1 className="text-2xl lg:text-3xl font-bold mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center mb-10 overflow-x-auto scrollbar-hide">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-2.5 shrink-0">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    i < currentIndex
                      ? "bg-brand text-white"
                      : i === currentIndex
                      ? "bg-brand text-white ring-4 ring-brand/20"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {i < currentIndex ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium hidden sm:inline",
                    i <= currentIndex ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 transition-colors",
                    i < currentIndex ? "bg-brand" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border bg-card p-6">
              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" placeholder="John Doe" className="mt-1.5" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" className="mt-1.5" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="gst-number">GST Number (Optional)</Label>
                      <Input id="gst-number" placeholder="27AABCU9603R1ZX" className="mt-1.5" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="address-line-1">Address Line 1</Label>
                      <Input id="address-line-1" placeholder="Building, Street" className="mt-1.5" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="address-line-2">Address Line 2 (Optional)</Label>
                      <Input id="address-line-2" placeholder="Landmark, Area" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Mumbai" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="Maharashtra" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" inputMode="numeric" placeholder="400001" className="mt-1.5" />
                    </div>
                  </div>
                  <Button onClick={() => setCurrentStep("billing")} className="w-full h-11 bg-brand hover:bg-brand-dark text-white mt-2">
                    Continue to Billing
                  </Button>
                </div>
              )}

              {/* Billing Step */}
              {currentStep === "billing" && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold">Billing Details</h2>
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <Label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-brand w-4 h-4" />
                      <span className="text-sm">Same as shipping address</span>
                    </Label>
                  </div>
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      GST Information
                    </Label>
                    <Input aria-label="GST Number for tax invoice" placeholder="Enter GST Number for tax invoice" />
                    <p className="text-xs text-muted-foreground">
                      GST invoice will be generated automatically for registered businesses.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep("shipping")} className="flex-1 h-11">
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep("payment")} className="flex-1 h-11 bg-brand hover:bg-brand-dark text-white">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    {[
                      { value: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
                      { value: "netbanking", label: "Net Banking", desc: "All major banks", icon: Building2 },
                      { value: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm", icon: Building2 },
                      { value: "cod", label: "Cash on Delivery", desc: "Pay when you receive", icon: Truck },
                    ].map((method) => {
                      const Icon = method.icon
                      return (
                        <Label
                          key={method.value}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors",
                            paymentMethod === method.value ? "border-brand bg-brand/5" : "hover:border-border/80"
                          )}
                        >
                          <RadioGroupItem value={method.value} className="data-[state=checked]:border-brand data-[state=checked]:text-brand" />
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.desc}</p>
                          </div>
                        </Label>
                      )
                    })}
                  </RadioGroup>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep("billing")} className="flex-1 h-11">
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep("review")} className="flex-1 h-11 bg-brand hover:bg-brand-dark text-white">
                      Continue to Review
                    </Button>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {currentStep === "review" && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold">Review Your Order</h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Shipping To</span>
                        <button className="text-xs text-brand" onClick={() => setCurrentStep("shipping")}>Edit</button>
                      </div>
                      <p className="text-sm text-muted-foreground">John Doe</p>
                      <p className="text-sm text-muted-foreground">123, Business District, Andheri East</p>
                      <p className="text-sm text-muted-foreground">Mumbai, Maharashtra - 400001</p>
                      <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Payment Method</span>
                        <button className="text-xs text-brand" onClick={() => setCurrentStep("payment")}>Edit</button>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">{paymentMethod.replace("-", " ")}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Items</span>
                        <button className="text-xs text-brand" onClick={() => setCurrentStep("shipping")}>Edit</button>
                      </div>
                      <div className="space-y-2">
                        {["3M SecureFit Helmet x10", "Honeywell N95 x200", "Ansell Gloves x24"].map((item) => (
                          <div key={item} className="flex justify-between text-sm text-muted-foreground">
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button size="lg" className="w-full h-12 bg-brand hover:bg-brand-dark text-white font-semibold">
                    Place Order - ₹1,38,740
                  </Button>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                    <Shield className="h-3.5 w-3.5" />
                    Your order is protected by SSL encryption
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-xl border bg-card p-6 space-y-4">
              <h3 className="text-base font-semibold">Order Summary</h3>
              <div className="space-y-3">
                {[
                  { name: "3M SecureFit Helmet", qty: "x10", price: "₹8,990" },
                  { name: "Honeywell N95 Respirator", qty: "x200", price: "₹9,000" },
                  { name: "Ansell HyFlex Gloves", qty: "x24", price: "₹7,176" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.qty}</p>
                    </div>
                    <span className="shrink-0 ml-2">{item.price}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹25,166</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>₹4,530</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-emerald-600">Free</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>₹29,696</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

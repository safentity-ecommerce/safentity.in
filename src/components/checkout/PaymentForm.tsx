"use client"

import { Building2, CreditCard, Truck } from "lucide-react"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { cn } from "@/lib/utils"

interface PaymentFormProps {
  paymentMethod: string
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>
  onBack: () => void
  onContinue: () => void
}

export function PaymentForm({
  paymentMethod,
  setPaymentMethod,
  onBack,
  onContinue,
}: PaymentFormProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Payment Method</h2>

      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        className="space-y-3"
      >
        {[
          {
            value: "card",
            label: "Credit / Debit Card",
            desc: "Visa, Mastercard, RuPay",
            icon: CreditCard,
          },
          {
            value: "netbanking",
            label: "Net Banking",
            desc: "All major banks",
            icon: Building2,
          },
          {
            value: "upi",
            label: "UPI",
            desc: "Google Pay, PhonePe, Paytm",
            icon: Building2,
          },
          {
            value: "cod",
            label: "Cash on Delivery",
            desc: "Pay when you receive",
            icon: Truck,
          },
        ].map((method) => {
          const Icon = method.icon

          return (
            <Label
              key={method.value}
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors",
                paymentMethod === method.value
                  ? "border-brand bg-brand/5"
                  : "hover:border-border/80",
              )}
            >
              <RadioGroupItem
                value={method.value}
                className="data-[state=checked]:border-brand data-[state=checked]:text-brand"
              />

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
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 h-11 cursor-pointer"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={onContinue}
          className="flex-1 h-11 bg-brand hover:bg-brand-dark text-white cursor-pointer"
        >
          Continue to Review
        </Button>
      </div>
    </div>
  )
}

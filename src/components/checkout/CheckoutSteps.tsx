"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: "shipping", label: "Shipping" },
  { id: "billing", label: "Billing" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
]

interface CheckoutStepsProps {
  currentStep: string
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
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
                    : "bg-muted text-muted-foreground",
              )}
            >
              {i < currentIndex ? <Check className="h-4 w-4" /> : i + 1}
            </div>

            <span
              className={cn(
                "text-sm font-medium hidden sm:inline",
                i <= currentIndex ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              className={cn(
                "w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 transition-colors",
                i < currentIndex ? "bg-brand" : "bg-muted",
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

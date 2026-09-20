"use client"

import { Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { BillingDetails, ShippingDetails } from "@/types/checkout"

interface BillingFormProps {
  billingDetails: BillingDetails
  setBillingDetails: React.Dispatch<React.SetStateAction<BillingDetails>>
  sameAsShipping: boolean
  setSameAsShipping: React.Dispatch<React.SetStateAction<boolean>>
  onBack: () => void
  onContinue: () => void
}

export function BillingForm({
  billingDetails,
  setBillingDetails,
  sameAsShipping,
  setSameAsShipping,
  onBack,
  onContinue,
}: BillingFormProps) {
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
        onContinue()
      }}
    >
      <h2 className="text-lg font-semibold">Billing Details</h2>

      {/* Same as shipping */}
      <div className="p-4 rounded-lg bg-muted/50 border">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => setSameAsShipping(e.target.checked)}
            className="accent-brand w-4 h-4"
          />

          <span className="text-sm">Same as shipping address</span>
        </label>
      </div>

      {/* Separate Billing Address */}
      {!sameAsShipping && (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold">Billing Address</h3>

            <p className="text-xs text-muted-foreground mt-1">
              Enter the address that should appear on the invoice.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Company Name */}
            <div className="col-span-2">
              <Label htmlFor="billing-company">
                Company Name <span className="text-red-500">*</span>
              </Label>

              <Input
                id="billing-company"
                value={billingDetails.companyName}
                onChange={(e) =>
                  setBillingDetails((current) => ({
                    ...current,
                    companyName: e.target.value,
                  }))
                }
                placeholder="ABC Industries Pvt. Ltd."
                className="mt-1.5"
                required
              />
            </div>

            {/* GST */}
            <div className="col-span-2">
              <Label htmlFor="billing-gst">
                GST Number{" "}
                <span className="text-muted-foreground">(Optional)</span>
              </Label>

              <Input
                id="billing-gst"
                value={billingDetails.gstNumber}
                onChange={(e) =>
                  setBillingDetails((current) => ({
                    ...current,
                    gstNumber: e.target.value,
                  }))
                }
                placeholder="27AABCU9603R1ZX"
                className="mt-1.5"
              />
            </div>

            {/* Billing Address */}
            <div className="col-span-2">
              <Label htmlFor="billing-address-1">
                Address Line 1 <span className="text-red-500">*</span>
              </Label>

              <Input
                id="billing-address-1"
                value={billingDetails.addressLine1}
                onChange={(e) =>
                  setBillingDetails((current) => ({
                    ...current,
                    addressLine1: e.target.value,
                  }))
                }
                placeholder="Building, Street"
                className="mt-1.5"
                required
              />
            </div>

            {/* Address 2 */}
            <div className="col-span-2">
              <Label htmlFor="billing-address-2">
                Address Line 2{" "}
                <span className="text-muted-foreground">(Optional)</span>
              </Label>

              <Input
                id="billing-address-2"
                value={billingDetails.addressLine2}
                onChange={(e) =>
                  setBillingDetails((current) => ({
                    ...current,
                    addressLine2: e.target.value,
                  }))
                }
                placeholder="Landmark, Area"
                className="mt-1.5"
              />
            </div>

            {/* City */}
            <div>
              <Label htmlFor="billing-city">
                City <span className="text-red-500">*</span>
              </Label>

              <Input
                id="billing-city"
                value={billingDetails.city}
                onChange={(e) =>
                  setBillingDetails((current) => ({
                    ...current,
                    city: e.target.value,
                  }))
                }
                placeholder="Mumbai"
                className="mt-1.5"
                required
              />
            </div>

            {/* State */}
            <div>
              <Label htmlFor="billing-state">
                State <span className="text-red-500">*</span>
              </Label>

              <Input
                id="billing-state"
                value={billingDetails.state}
                onChange={(e) =>
                  setBillingDetails((current) => ({
                    ...current,
                    state: e.target.value,
                  }))
                }
                placeholder="Maharashtra"
                className="mt-1.5"
                required
              />
            </div>

            {/* Pincode */}
            <div>
              <Label htmlFor="billing-pincode">
                Pincode <span className="text-red-500">*</span>
              </Label>

              <Input
                id="billing-pincode"
                value={billingDetails.pincode}
                onChange={(e) =>
                  setBillingDetails((current) => ({
                    ...current,
                    pincode: e.target.value,
                  }))
                }
                inputMode="numeric"
                placeholder="400001"
                className="mt-1.5"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* GST information when same address */}
      {sameAsShipping && (
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            GST Information
          </Label>

          <Input
            value={billingDetails.gstNumber}
            onChange={(e) =>
              setBillingDetails((current) => ({
                ...current,
                gstNumber: e.target.value,
              }))
            }
            aria-label="GST Number for tax invoice"
            placeholder="Enter GST Number for tax invoice"
          />

          <p className="text-xs text-muted-foreground">
            GST invoice will be generated automatically for registered
            businesses.
          </p>
        </div>
      )}

      {/* Navigation */}
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
          type="submit"
          className="flex-1 h-11 bg-brand hover:bg-brand-dark text-white cursor-pointer"
        >
          Continue to Payment
        </Button>
      </div>
    </form>
  )
}

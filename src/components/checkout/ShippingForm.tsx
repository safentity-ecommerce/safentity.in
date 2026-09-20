"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ShippingDetails } from "@/types/checkout"

interface ShippingFormProps {
  shippingDetails: ShippingDetails
  setShippingDetails: React.Dispatch<React.SetStateAction<ShippingDetails>>
  onContinue: () => void
}

export function ShippingForm({
  shippingDetails,
  setShippingDetails,
  onContinue,
}: ShippingFormProps) {
  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault()
        onContinue()
      }}
    >
      <h2 className="text-lg font-semibold">Shipping Address</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="col-span-2">
          <Label htmlFor="full-name">
            Full Name <span className="text-red-500">*</span>
          </Label>

          <Input
            id="full-name"
            value={shippingDetails.fullName}
            onChange={(event) =>
              setShippingDetails((current) => ({
                ...current,
                fullName: event.target.value,
              }))
            }
            placeholder="John Doe"
            className="mt-1.5"
            required
          />
        </div>

        {/* Phone */}
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="phone">
            Phone Number <span className="text-red-500">*</span>
          </Label>

          <Input
            id="phone"
            value={shippingDetails.phone}
            onChange={(event) =>
              setShippingDetails((current) => ({
                ...current,
                phone: event.target.value,
              }))
            }
            type="tel"
            placeholder="+91 98765 43210"
            className="mt-1.5"
            required
          />
        </div>

        {/* Address Line 1 */}
        <div className="col-span-2">
          <Label htmlFor="address-line-1">
            Address Line 1 <span className="text-red-500">*</span>
          </Label>

          <Input
            id="address-line-1"
            value={shippingDetails.addressLine1}
            onChange={(event) =>
              setShippingDetails((current) => ({
                ...current,
                addressLine1: event.target.value,
              }))
            }
            placeholder="Building, Street"
            className="mt-1.5"
            required
          />
        </div>

        {/* Address Line 2 */}
        <div className="col-span-2">
          <Label htmlFor="address-line-2">
            Address Line 2{" "}
            <span className="text-muted-foreground">(Optional)</span>
          </Label>

          <Input
            id="address-line-2"
            value={shippingDetails.addressLine2}
            onChange={(event) =>
              setShippingDetails((current) => ({
                ...current,
                addressLine2: event.target.value,
              }))
            }
            placeholder="Landmark, Area"
            className="mt-1.5"
          />
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">
            City <span className="text-red-500">*</span>
          </Label>

          <Input
            id="city"
            value={shippingDetails.city}
            onChange={(event) =>
              setShippingDetails((current) => ({
                ...current,
                city: event.target.value,
              }))
            }
            placeholder="Mumbai"
            className="mt-1.5"
            required
          />
        </div>

        {/* State */}
        <div>
          <Label htmlFor="state">
            State <span className="text-red-500">*</span>
          </Label>

          <Input
            id="state"
            value={shippingDetails.state}
            onChange={(event) =>
              setShippingDetails((current) => ({
                ...current,
                state: event.target.value,
              }))
            }
            placeholder="Maharashtra"
            className="mt-1.5"
            required
          />
        </div>

        {/* Pincode */}
        <div>
          <Label htmlFor="pincode">
            Pincode <span className="text-red-500">*</span>
          </Label>

          <Input
            id="pincode"
            value={shippingDetails.pincode}
            onChange={(event) =>
              setShippingDetails((current) => ({
                ...current,
                pincode: event.target.value,
              }))
            }
            inputMode="numeric"
            placeholder="400001"
            className="mt-1.5"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-brand hover:bg-brand-dark text-white mt-2 cursor-pointer"
      >
        Continue to Billing
      </Button>
    </form>
  )
}

export interface Address {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pincode: string
}

export interface ShippingDetails extends Address {
  fullName: string
  phone: string
}

export interface BillingDetails extends Address {
  companyName: string
  gstNumber: string
}

export type CheckoutStep = "shipping" | "billing" | "payment" | "review"

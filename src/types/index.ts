export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  brandSlug: string
  category: string
  categorySlug: string
  description: string
  price: number
  moq: number
  sku: string
  rating: number
  reviewCount: number
  stockStatus: "in_stock" | "low_stock" | "out_of_stock"
  images: string[]
  certifications: string[]
  isNew: boolean
  isBestSeller: boolean
  deliveryBadge: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  icon: string
  productCount: number
  children: Category[]
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  productCount: number
  isFeatured: boolean
}

export interface Industry {
  id: string
  name: string
  slug: string
  description: string
  image: string
  solutions: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Address {
  id: string
  label: string
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
  type: "shipping" | "billing" | "both"
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  items: CartItem[]
  total: number
  gst: number
  shipping: number
  grandTotal: number
  address: Address
}

export interface RFQ {
  id: string
  product: Product
  quantity: number
  status: "pending" | "quoted" | "accepted" | "expired"
  date: string
}

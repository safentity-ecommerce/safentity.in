"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  FileText,
  BarChart3,
  Star,
  Truck,
  Shield,
  Minus,
  Plus,
  Share2,
  Download,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ProductCard } from "@/components/products/ProductCard"
import { proudProducts } from "@/lib/data/products"
import { cn, formatINR } from "@/lib/utils"
import Image from "next/image"

export default function ProductDetailPage() {
  const params = useParams<{ slug: string | string[] }>()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const product = proudProducts.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const specifications = [
    { label: "Brand", value: product.brand },
    { label: "SKU", value: product.sku },
    { label: "Category", value: product.category },
    { label: "Material", value: "Polyethylene (HDPE)" },
    { label: "Weight", value: "380g" },
    { label: "Size", value: "One Size (Adjustable)" },
    { label: "Color", value: "White / Yellow / Orange" },
    { label: "Standards", value: product.certifications.join(", ") },
    { label: "Shelf Life", value: "5 Years" },
    { label: "Country of Origin", value: "India" },
  ]

  const faqs = [
    {
      q: "What is the minimum order quantity?",
      a: `The MOQ for this product is ${product.moq} units. For bulk orders above 100 units, please contact our sales team for special pricing.`,
    },
    {
      q: "Does this product comply with IS standards?",
      a: `Yes, this product is certified as per ${product.certifications.join(", ")}.`,
    },
    {
      q: "What is the estimated delivery time?",
      a: "Standard delivery is 3-5 business days across India. Express delivery is available at an additional cost.",
    },
    {
      q: "Can I get a GST invoice?",
      a: "Yes, we provide GST-compliant invoices with e-invoice facility for all business purchases.",
    },
    {
      q: "Do you provide bulk discounts?",
      a: "Yes, we offer tiered pricing for bulk orders. Contact our sales team for a customized quote.",
    },
  ]

  const relatedproudProducts = proudProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const [quantity, setQuantity] = useState(product.moq)
  const [selectedImage, setSelectedImage] = useState(0)

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(product.moq, prev + delta))
  }

  return (
    <div className="container py-6 lg:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link
          href="/categories"
          className="hover:text-foreground transition-colors"
        >
          Categories
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link
          href={`/categories/${product.categorySlug}`}
          className="hover:text-foreground transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <span className="text-foreground font-medium truncate">
          {product.name}
        </span>
      </nav>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-xl bg-muted overflow-hidden">
            {product.images.length > 0 ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                <Package className="h-10 w-10" />
                <span className="text-sm">Image coming soon</span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative w-20 h-20 rounded-lg bg-muted overflow-hidden border-2 transition-colors",
                    selectedImage === index
                      ? "border-brand"
                      : "border-transparent hover:border-border",
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Brand */}
          <Link
            href={`/brands/${product.brandSlug}`}
            className="text-sm font-medium text-brand hover:text-brand-light transition-colors"
          >
            {product.brand}
          </Link>

          {/* Name */}
          <h1 className="text-2xl lg:text-3xl font-bold mt-1 leading-tight">
            {product.name}
          </h1>

          {/* SKU & Rating */}
          <div className="flex items-center flex-wrap gap-3 mt-2">
            <span className="text-xs text-muted-foreground font-mono">
              SKU: {product.sku}
            </span>
            <span className="text-muted-foreground/30">|</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {formatINR(product.price)}
              </span>
              <span className="text-sm text-muted-foreground">per unit</span>
            </div>
            {product.moq > 1 && (
              <p className="text-sm text-muted-foreground mt-1">
                Minimum order quantity: {product.moq} units
              </p>
            )}
          </div>

          {/* Stock & Delivery */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge
              className={cn(
                "border-0 text-xs font-medium px-3 py-1",
                product.stockStatus === "in_stock"
                  ? "bg-emerald-50 text-emerald-700"
                  : product.stockStatus === "low_stock"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700",
              )}
            >
              {product.stockStatus === "in_stock"
                ? "In Stock"
                : product.stockStatus === "low_stock"
                  ? "Low Stock"
                  : "Out of Stock"}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Truck className="h-3.5 w-3.5" />
              Free delivery on orders above ₹2,000
            </span>
          </div>

          {/* Certifications */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-600" />
            {product.certifications.map((cert) => (
              <span
                key={cert}
                className="px-2.5 py-1 text-xs rounded-md bg-muted text-muted-foreground border"
              >
                {cert}
              </span>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-product.moq)}
                  disabled={quantity <= product.moq}
                  aria-label="Decrease quantity"
                  className="p-2.5 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        product.moq,
                        parseInt(e.target.value) || product.moq,
                      ),
                    )
                  }
                  className="w-16 text-center text-sm font-medium border-x bg-transparent py-2.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => handleQuantityChange(product.moq)}
                  aria-label="Increase quantity"
                  className="p-2.5 hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="flex-1 h-12 text-base font-semibold bg-brand hover:bg-brand-dark text-white"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 text-base font-medium"
              >
                <FileText className="h-5 w-5 mr-2" />
                Request Quote
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <Heart className="h-4 w-4 mr-1.5" />
                Add to Wishlist
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <BarChart3 className="h-4 w-4 mr-1.5" />
                Compare
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <Share2 className="h-4 w-4 mr-1.5" />
                Share
              </Button>
            </div>
          </div>

          {/* Bulk Pricing */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm font-semibold mb-2">Bulk Pricing Available</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>{formatINR(product.price)}/unit</p>
              <p>{formatINR(Math.round(product.price * 0.95))}/unit (5% off)</p>
              <p>{formatINR(Math.round(product.price * 0.9))}/unit (10% off)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12 lg:mt-16">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto gap-0 overflow-x-auto scrollbar-hide">
            {[
              "specifications",
              "description",
              "certifications",
              "downloads",
              "faqs",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="px-4 sm:px-6 py-3 text-sm font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:text-brand data-[state=active]:bg-transparent capitalize transition-colors"
              >
                {tab === "faqs" ? "FAQs" : tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="specifications" className="pt-6">
            <div className="max-w-2xl">
              <table className="w-full">
                <tbody>
                  {specifications.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={cn(i % 2 === 0 && "bg-muted/30")}
                    >
                      <td className="py-3 px-4 text-sm font-medium text-muted-foreground w-1/3">
                        {spec.label}
                      </td>
                      <td className="py-3 px-4 text-sm">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="description" className="pt-6">
            <div className="max-w-3xl prose prose-sm">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Designed for industrial environments, this product meets
                rigorous safety standards and provides reliable protection for
                workers across various applications. The ergonomic design
                ensures comfort during extended use without compromising on
                safety.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="pt-6">
            <div className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 p-4 rounded-lg border bg-card"
                >
                  <Shield className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{cert}</p>
                    <p className="text-xs text-muted-foreground">
                      Certified Standard
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="downloads" className="pt-6">
            <div className="max-w-2xl space-y-3">
              {[
                "Technical Datasheet",
                "Installation Guide",
                "Safety Manual",
                "Compliance Certificate",
              ].map((doc) => (
                <div
                  key={doc}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc}</p>
                      <p className="text-xs text-muted-foreground">
                        PDF, 2.4 MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Download ${doc}`}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="pt-6">
            <div className="max-w-2xl">
              <Accordion className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm font-medium text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {relatedproudProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {relatedproudProducts.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} variant="compact" />
          ))}
        </div>
      </section>
    </div>
  )
}

import { Heart } from "lucide-react"
import { proudProducts } from "@/lib/data/products"
import { ProductCard } from "@/components/products/ProductCard"

export default function WishlistPage() {
  return (
    <div className="container py-6 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
        {proudProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {proudProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-12 text-center">
            <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Save your favorite products here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

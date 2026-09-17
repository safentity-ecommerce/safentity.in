import { ShoppingBag } from "lucide-react"

export default function SavedCartsPage() {
  return (
    <div className="container py-6 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Saved Carts</h1>
        <div className="rounded-xl border bg-card p-12 text-center">
          <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No saved carts</h3>
          <p className="text-sm text-muted-foreground mt-1">Save your current cart for later</p>
        </div>
      </div>
    </div>
  )
}

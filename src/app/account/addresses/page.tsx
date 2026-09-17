import { MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AddressesPage() {
  return (
    <div className="container py-6 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">My Addresses</h1>
          <Button className="bg-brand hover:bg-brand-dark text-white">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Address
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Office", type: "both", name: "John Doe", phone: "+91 98765 43210", line1: "123, Business District", line2: "Andheri East", city: "Mumbai", state: "Maharashtra", pincode: "400001", default: true },
            { label: "Warehouse", type: "shipping", name: "John Doe", phone: "+91 98765 43210", line1: "Industrial Zone, Plot 45", line2: "Bhiwandi", city: "Thane", state: "Maharashtra", pincode: "421302", default: false },
          ].map((addr) => (
            <div key={addr.label} className="p-5 rounded-xl border bg-card relative">
              {addr.default && (
                <Badge className="absolute top-3 right-3 bg-brand text-white border-0 text-[10px]">Default</Badge>
              )}
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{addr.label}</span>
                <Badge variant="outline" className="text-[10px]">{addr.type}</Badge>
              </div>
              <p className="text-sm">{addr.name}</p>
              <p className="text-sm text-muted-foreground">{addr.line1}</p>
              {addr.line2 && <p className="text-sm text-muted-foreground">{addr.line2}</p>}
              <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} - {addr.pincode}</p>
              <p className="text-sm text-muted-foreground">{addr.phone}</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t">
                <button className="text-xs text-brand hover:text-brand-light transition-colors">Edit</button>
                <button className="text-xs text-muted-foreground hover:text-red-500 transition-colors">Delete</button>
                {!addr.default && <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Set as Default</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

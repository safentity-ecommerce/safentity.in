import { FileCheck, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GSTPage() {
  return (
    <div className="container py-6 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">GST Details</h1>
          <Button className="bg-brand hover:bg-brand-dark text-white">
            <Plus className="h-4 w-4 mr-1.5" />
            Add GST
          </Button>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <FileCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium">27AABCU9603R1ZX</p>
              <p className="text-xs text-muted-foreground">Verified | John Doe Enterprises</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Business Name:</span> <span className="font-medium">John Doe Enterprises</span></div>
            <div><span className="text-muted-foreground">GSTIN:</span> <span className="font-medium">27AABCU9603R1ZX</span></div>
            <div><span className="text-muted-foreground">State:</span> <span className="font-medium">Maharashtra</span></div>
            <div><span className="text-muted-foreground">Type:</span> <span className="font-medium">Regular</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

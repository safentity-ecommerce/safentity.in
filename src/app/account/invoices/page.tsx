import { FileText } from "lucide-react"

export default function InvoicesPage() {
  return (
    <div className="container py-6 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">My Invoices</h1>
        <div className="rounded-xl border bg-card p-12 text-center">
          <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No invoices yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Your GST invoices will appear here after your first purchase</p>
        </div>
      </div>
    </div>
  )
}

import { MessageCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="container py-6 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <Button className="bg-brand hover:bg-brand-dark text-white">
            <Plus className="h-4 w-4 mr-1.5" />
            New Ticket
          </Button>
        </div>
        <div className="rounded-xl border bg-card p-12 text-center">
          <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No support tickets</h3>
          <p className="text-sm text-muted-foreground mt-1">Your support requests will appear here</p>
        </div>
      </div>
    </div>
  )
}

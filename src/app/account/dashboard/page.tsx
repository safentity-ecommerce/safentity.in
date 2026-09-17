import Link from "next/link"
import { Package, FileText, Heart, ShoppingBag, MapPin, FileCheck, Download, MessageCircle } from "lucide-react"
import { cn, formatINR } from "@/lib/utils"

const sidebarLinks = [
  { icon: Package, label: "Dashboard", href: "/account/dashboard" },
  { icon: ShoppingBag, label: "Orders", href: "/account/orders" },
  { icon: FileText, label: "RFQs", href: "/account/orders" },
  { icon: Heart, label: "Wishlist", href: "/account/wishlist" },
  { icon: ShoppingBag, label: "Saved Carts", href: "/account/saved-carts" },
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  { icon: FileCheck, label: "GST Details", href: "/account/gst" },
  { icon: FileText, label: "Invoices", href: "/account/invoices" },
  { icon: Download, label: "Downloads", href: "/account/downloads" },
  { icon: MessageCircle, label: "Support Tickets", href: "/account/support" },
]

const recentOrders = [
  { id: "#ORD-2026-0042", date: "02 Jul 2026", status: "Delivered", total: 24999, items: 3 },
  { id: "#ORD-2026-0041", date: "28 Jun 2026", status: "Shipped", total: 8990, items: 1 },
  { id: "#ORD-2026-0040", date: "25 Jun 2026", status: "Processing", total: 15500, items: 2 },
]

const rfqStatuses = [
  { id: "#RFQ-2026-0018", date: "30 Jun 2026", status: "Quoted", items: 5 },
  { id: "#RFQ-2026-0017", date: "28 Jun 2026", status: "Pending", items: 3 },
]

export default function AccountDashboardPage() {
  return (
    <div className="container py-6 lg:py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">JD</span>
              </div>
              <h3 className="text-base font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">john@safentity.in</p>
            </div>
            {sidebarLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg transition-colors",
                    link.label === "Dashboard"
                      ? "bg-brand/5 text-brand font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Orders", value: "24", icon: Package },
              { label: "Active RFQs", value: "3", icon: FileText },
              { label: "Wishlist Items", value: "12", icon: Heart },
              { label: "Saved Carts", value: "2", icon: ShoppingBag },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="p-4 rounded-xl border bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="h-4.5 w-4.5 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Recent Orders */}
          <div className="rounded-xl border bg-card mb-8">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-base font-semibold">Recent Orders</h2>
              <Link href="/account/orders" className="text-sm text-brand hover:text-brand-light transition-colors">
                View All
              </Link>
            </div>
            <div className="divide-y">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{order.date}</span>
                        <span className="text-muted-foreground/30">|</span>
                        <span className="text-xs text-muted-foreground">{order.items} items</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatINR(order.total)}</p>
                    <span
                      className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-full",
                        order.status === "Delivered" && "bg-emerald-50 text-emerald-700",
                        order.status === "Shipped" && "bg-blue-50 text-blue-700",
                        order.status === "Processing" && "bg-amber-50 text-amber-700"
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RFQ Status */}
          <div className="rounded-xl border bg-card">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-base font-semibold">Recent RFQs</h2>
              <Link href="/account/orders" className="text-sm text-brand hover:text-brand-light transition-colors">
                View All
              </Link>
            </div>
            <div className="divide-y">
              {rfqStatuses.map((rfq) => (
                <div key={rfq.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{rfq.id}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{rfq.date}</span>
                        <span className="text-muted-foreground/30">|</span>
                        <span className="text-xs text-muted-foreground">{rfq.items} items</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full",
                      rfq.status === "Quoted" && "bg-emerald-50 text-emerald-700",
                      rfq.status === "Pending" && "bg-amber-50 text-amber-700"
                    )}
                  >
                    {rfq.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

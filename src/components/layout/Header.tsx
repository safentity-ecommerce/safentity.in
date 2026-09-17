"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/layout/SearchBar"
import { useScrollDirection } from "@/hooks/useScrollDirection"
import { cn } from "@/lib/utils"
import { SITE_NAME, navigationItems, COMPANY_LOGO } from "@/lib/config"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const { isScrolled, isVisible } = useScrollDirection()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-transform duration-300",
        !isVisible && "-translate-y-full",
      )}
    >
      {/* Main Header */}
      <div
        className={cn(
          "border-b transition-shadow duration-200",
          isScrolled && "shadow-sm",
        )}
      >
        <div className="container flex items-center justify-between gap-4 h-16 lg:h-28">
          {/* Mobile Menu Toggle */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              className="lg:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted h-8 w-8 shrink-0"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="text-lg font-bold">{SITE_NAME}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2">
                    Navigation
                  </p>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center px-3 py-2.5 text-sm rounded-md hover:bg-muted transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <Image
                src={COMPANY_LOGO}
                alt={SITE_NAME}
                width={180}
                height={50}
                priority
                className="h-32 w-auto"
              />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-3xl lg:max-w-3xl hidden sm:block">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/account/wishlist"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-base font-medium text-gray-600 transition-all hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden lg:inline">Wishlist</span>
            </Link>

            <Link
              href="/account/dashboard"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-base font-medium text-gray-600 transition-all hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            >
              <User className="h-5 w-5" />
              <span className="hidden lg:inline">Account</span>
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-base font-medium text-gray-600 transition-all hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden lg:inline">Cart</span>

              <Badge className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand p-0 text-[10px] font-bold text-white">
                3
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

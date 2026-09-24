"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu, ArrowRight } from "lucide-react"
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
import { useCart } from "../context/CartContext"
import { AuthButton } from "@/components/auth/AuthButton"

export function Header() {
  const { isScrolled, isVisible } = useScrollDirection()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { cartCount } = useCart()

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
        <div className="container flex items-center justify-between gap-4 h-16 lg:h-22">
          {/* Mobile Menu Toggle */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              className="lg:hidden group relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background transition-all duration-200 hover:border-primary/40 hover:bg-muted active:scale-95"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[310px] border-r border-border/60 bg-background p-0 shadow-2xl"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>

              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <div>
                    <span className="text-lg font-bold tracking-tight">
                      {SITE_NAME}
                    </span>
                  </div>

                  {/* <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="h-8 w-8 rounded-lg transition-all hover:bg-muted active:scale-90"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </Button> */}
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-3 py-5">
                  <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Menu
                  </p>

                  <nav className="space-y-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="
                group flex items-center justify-between
                rounded-xl px-3.5 py-3
                text-sm font-medium
                transition-all duration-200
                hover:bg-muted
                hover:translate-x-1
              "
                      >
                        <span>{item.label}</span>

                        <ArrowRight
                          className="
                  h-4 w-4
                  text-muted-foreground
                  opacity-0
                  -translate-x-2
                  transition-all duration-200
                  group-hover:translate-x-0
                  group-hover:opacity-100
                "
                        />
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Bottom section */}
                <div className="border-t bg-muted/30 p-4">
                  <AuthButton fullWidth className="border-border/60 bg-background hover:bg-muted" />
                  <div className="mt-2 rounded-xl bg-background p-4 shadow-sm">
                    <p className="text-sm font-semibold">Need help?</p>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Talk to our safety equipment specialists.
                    </p>

                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-3 inline-flex items-center text-xs font-semibold text-primary hover:underline"
                    >
                      Contact us
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </div>
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
                className="h-24 w-auto"
              />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl lg:max-w-3xl hidden sm:block">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* <Link
              href="/account/wishlist"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden lg:inline">Wishlist</span>
            </Link> */}

            <AuthButton />

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden lg:inline">Cart</span>

              {cartCount > 0 && (
                <Badge className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand p-0 text-[10px] font-bold text-white">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

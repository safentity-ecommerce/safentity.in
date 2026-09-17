"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Factory, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { navigationItems } from "@/lib/config"
import { categories, featuredBrands, industries } from "@/lib/data"
import { categoryIcons } from "@/components/shared/Icons"

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const getMegaMenuContent = (label: string) => {
    switch (label) {
      case "Categories":
        return (
          <div className="grid grid-cols-4 gap-6 p-6">
            {categories.slice(0, 8).map((cat) => {
              const Icon = categoryIcons[cat.icon]
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="mt-0.5 w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                    {Icon && (
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium group-hover:text-brand transition-colors">
                      {cat.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {cat.productCount} proudProducts
                    </p>
                  </div>
                </Link>
              )
            })}
            <Link
              href="/categories"
              className="col-span-4 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-brand hover:text-brand-light border-t transition-colors"
            >
              View All Categories <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )
      case "Brands":
        return (
          <div className="grid grid-cols-4 gap-4 p-6">
            {featuredBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-semibold shrink-0 group-hover:bg-white transition-colors">
                  {brand.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium group-hover:text-brand transition-colors">
                    {brand.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {brand.productCount} proudProducts
                  </p>
                </div>
              </Link>
            ))}
            <Link
              href="/brands"
              className="col-span-4 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-brand hover:text-brand-light border-t transition-colors"
            >
              View All Brands <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )
      case "Industries":
        return (
          <div className="grid grid-cols-3 gap-6 p-6">
            {industries.map((ind) => (
              <Link
                key={ind.id}
                href={`/industries/${ind.slug}`}
                className="group p-4 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Factory className="h-5 w-5 text-muted-foreground group-hover:text-brand transition-colors" />
                  <p className="text-sm font-medium group-hover:text-brand transition-colors">
                    {ind.name}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {ind.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ind.solutions.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 text-[10px] rounded bg-muted-foreground/10 text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <nav
      ref={menuRef}
      className="hidden lg:block border-b bg-white"
      onMouseLeave={handleMouseLeave}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          {navigationItems.map((item) => {
            const hasMegaMenu = ["Categories", "Brands", "Industries"].includes(
              item.label,
            )
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasMegaMenu && handleMouseEnter(item.label)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 border-transparent",
                    activeMenu === item.label
                      ? "text-brand border-brand bg-brand/[0.03]"
                      : "text-foreground hover:text-brand hover:bg-muted/50",
                  )}
                >
                  {item.label}
                  {hasMegaMenu && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        activeMenu === item.label && "rotate-180",
                      )}
                    />
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {activeMenu && (
        <div
          className="absolute left-0 right-0 top-full bg-white border-b shadow-lg z-40 animate-in fade-in-0 slide-in-from-top-1 duration-150"
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            setActiveMenu(activeMenu)
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container">{getMegaMenuContent(activeMenu)}</div>
        </div>
      )}
    </nav>
  )
}

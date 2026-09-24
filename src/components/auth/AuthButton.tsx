"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User } from "lucide-react"
import { useAuth } from "@/components/context/AuthContext"
import { AuthModal } from "@/components/auth/AuthModal"
import { cn } from "@/lib/utils"

interface AuthButtonProps {
  className?: string
  fullWidth?: boolean
}

function hasAuthParam(): boolean {
  if (typeof window === "undefined") return false
  return new URLSearchParams(window.location.search).get("auth") === "1"
}

export function AuthButton({ className, fullWidth = false }: AuthButtonProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (!hasAuthParam()) return
    const timer = window.setTimeout(() => {
      setModalOpen(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!hasAuthParam()) return

    if (user && !hasRedirected.current) {
      hasRedirected.current = true
      router.replace("/account/dashboard")
    }

    const url = new URL(window.location.href)
    url.searchParams.delete("auth")
    window.history.replaceState(null, "", url.toString())
  }, [user, router])

  const baseClass = cn(
    "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all active:scale-95",
    fullWidth && "w-full justify-center",
    className,
  )

  return (
    <>
      {!isLoading &&
        (user ? (
          <Link
            href="/account/dashboard"
            className={cn(
              baseClass,
              "hidden border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900 sm:flex",
            )}
          >
            <User className="h-5 w-5" aria-hidden="true" />
            <span className="hidden lg:inline">Account</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className={cn(
              baseClass,
              "border-border/60 text-foreground hover:bg-muted",
            )}
          >
            <User className="h-5 w-5" aria-hidden="true" />
            <span>Sign In</span>
          </button>
        ))}

      <AuthModal
        key={String(modalOpen)}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
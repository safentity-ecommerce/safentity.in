"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/context/AuthContext"

export function SignOutButton({ className }: { className?: string }) {
  const { signout } = useAuth()
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function handleSignOut() {
    if (pending) return
    setPending(true)
    await signout()
    router.replace("/")
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={() => void handleSignOut()}
      disabled={pending}
      className={cn(
        "flex w-full items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted disabled:opacity-60",
        className,
      )}
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      {pending ? "Signing out…" : "Sign out"}
    </button>
  )
}
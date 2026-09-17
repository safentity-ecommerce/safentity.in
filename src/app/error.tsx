"use client"

import { useEffect } from "react"
import { TriangleAlertIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <TriangleAlertIcon className="size-10 text-destructive" />
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred while loading this page.
        </p>
      </div>
      <Button onClick={() => unstable_retry()}>Try again</Button>
    </div>
  )
}

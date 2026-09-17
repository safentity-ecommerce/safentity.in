import Link from "next/link"
import { SearchXIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <SearchXIcon className="size-10 text-muted-foreground" />
      <div className="space-y-1.5">
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <h2 className="text-lg font-semibold">Page not found</h2>
        <p className="text-sm text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Button render={<Link href="/" />} variant="outline">
        Back to Home
      </Button>
    </div>
  )
}

import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/current-user"

export const dynamic = "force-dynamic"

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/?auth=1")
  }

  return <>{children}</>
}
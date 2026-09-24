import { cache } from "react"
import { db } from "@/prisma/db"
import { getSessionUserId } from "@/lib/auth/session"

export interface SafeUser {
  id: string
  phone: string | null
  name: string | null
  email: string | null
}

export const getCurrentUser = cache(async (): Promise<SafeUser | null> => {
  const userId = await getSessionUserId()
  if (!userId) return null

  const user = await db.orm.public.User.first({ id: userId })
  if (!user) return null

  return {
    id: user.id,
    phone: user.phone,
    name: user.name,
    email: user.email,
  }
})
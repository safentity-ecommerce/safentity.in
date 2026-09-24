import { NextResponse, type NextRequest } from "next/server"
import { db } from "@/prisma/db"
import { isSameOrigin } from "@/lib/auth/http"
import { normalizePhone } from "@/lib/auth/phone"
import { isValidOtpCode, verifyOtp } from "@/lib/auth/otp"
import { setSessionCookie } from "@/lib/auth/session"
import type { SafeUser } from "@/lib/auth/current-user"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function toSafeUser(user: {
  id: string
  phone: string | null
  name: string | null
  email: string | null
}): SafeUser {
  return { id: user.id, phone: user.phone, name: user.name, email: user.email }
}

async function authenticateUser(
  phone: string,
  email: string | null,
): Promise<SafeUser> {
  const existing = await db.orm.public.User.where({ phone }).first()

  if (existing) {
    await setSessionCookie(existing.id)
    return toSafeUser(existing)
  }

  const normalizedEmail =
    email && EMAIL_PATTERN.test(email) ? email.trim().toLowerCase() : null

  try {
    const user = await db.orm.public.User.create({
      phone,
      name: null,
      email: normalizedEmail,
      password: null,
    })
    await setSessionCookie(user.id)
    return toSafeUser(user)
  } catch (error) {
    if ((error as { sqlState?: string })?.sqlState === "23505") {
      const user = await db.orm.public.User.create({
        phone,
        name: null,
        email: null,
        password: null,
      })
      await setSessionCookie(user.id)
      return toSafeUser(user)
    }
    throw error
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const phone =
    typeof body.phone === "string" ? normalizePhone(body.phone) : null
  const otp = typeof body.otp === "string" ? body.otp.trim() : ""
  const email = typeof body.email === "string" ? body.email : null

  if (!phone || !isValidOtpCode(otp)) {
    return NextResponse.json(
      { error: "Please enter the 6-digit OTP." },
      { status: 400 },
    )
  }

  const result = await verifyOtp(phone, otp)

  if (result.status !== "verified") {
    const message =
      result.status === "attempts_exhausted"
        ? "Too many incorrect attempts. Please request a new OTP."
        : "Invalid or expired OTP. Please try again or request a new OTP."
    return NextResponse.json({ error: message }, { status: 401 })
  }

  try {
    const user = await authenticateUser(phone, email)
    return NextResponse.json({ user })
  } catch (error) {
    console.error("OTP verification failed:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
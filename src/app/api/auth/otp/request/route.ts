import { NextResponse, type NextRequest } from "next/server"
import { isSameOrigin } from "@/lib/auth/http"
import { normalizePhone } from "@/lib/auth/phone"
import { createOtpChallenge, OTP_RATE_LIMIT_MAX_REQUESTS } from "@/lib/auth/otp"
import { getOTPProvider } from "@/lib/auth/otp-provider"

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

  if (!phone) {
    return NextResponse.json(
      { error: "Please enter a valid 10-digit Indian mobile number." },
      { status: 400 },
    )
  }

  let result: Awaited<ReturnType<typeof createOtpChallenge>>
  try {
    result = await createOtpChallenge(phone, getOTPProvider())
  } catch (error) {
    console.error("OTP send failed:", error)
    return NextResponse.json(
      { error: "We couldn't send the OTP right now. Please try again." },
      { status: 500 },
    )
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        error: `Too many requests. Please wait a few minutes and try again (max ${OTP_RATE_LIMIT_MAX_REQUESTS} per 10 minutes).`,
      },
      { status: 429 },
    )
  }

  return NextResponse.json({ ok: true })
}
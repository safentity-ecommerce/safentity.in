import { NextResponse, type NextRequest } from "next/server"
import { clearSessionCookie } from "@/lib/auth/session"
import { isSameOrigin } from "@/lib/auth/http"

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await clearSessionCookie()

  return NextResponse.json({ ok: true })
}
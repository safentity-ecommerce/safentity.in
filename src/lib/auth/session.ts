import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

export const SESSION_COOKIE = "safentity_session"
const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_COOKIE_MAX_AGE_SECONDS,
}

function getSigningKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not set. Add it to .env.local (generate with: openssl rand -hex 32).",
    )
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(userId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getSigningKey())
}

export async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSigningKey())
    const sub = payload.sub
    return typeof sub === "string" && sub.length > 0 ? sub : null
  } catch {
    return null
  }
}

export async function getSessionUserId(): Promise<string | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export async function setSessionCookie(userId: string): Promise<void> {
  const token = await createSessionToken(userId)
  const store = await cookies()
  store.set(SESSION_COOKIE, token, COOKIE_OPTIONS)
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}
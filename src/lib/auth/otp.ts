import { createHmac, randomInt, timingSafeEqual } from "node:crypto"
import { db } from "@/prisma/db"
import type { OTPProvider } from "@/lib/auth/otp-provider"

export const OTP_CODE_LENGTH = 6
export const OTP_TTL_SECONDS = 5 * 60
export const OTP_MAX_ATTEMPTS = 4
export const OTP_RATE_LIMIT_WINDOW_SECONDS = 10 * 60
export const OTP_RATE_LIMIT_MAX_REQUESTS = 5

function getHmacSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error("AUTH_SECRET is not set.")
  return secret
}

export function generateOtp(): string {
  return String(randomInt(10 ** (OTP_CODE_LENGTH - 1), 10 ** OTP_CODE_LENGTH))
}

function hashOtp(code: string): string {
  return createHmac("sha256", getHmacSecret()).update(code).digest("hex")
}

function otpMatches(code: string, expectedHash: string): boolean {
  const actual = Buffer.from(hashOtp(code), "hex")
  const expected = Buffer.from(expectedHash, "hex")
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export interface CreateChallengeResult {
  ok: boolean
  reason?: "rate_limited"
}

export async function createOtpChallenge(
  phone: string,
  provider: OTPProvider,
): Promise<CreateChallengeResult> {
  const windowStart = new Date(
    Date.now() - OTP_RATE_LIMIT_WINDOW_SECONDS * 1000,
  ).toISOString()

  const recentRows = await db.orm.public.OtpChallenge
    .where((o) => o.phone.eq(phone))
    .where((o) => o.createdAt.gt(windowStart))
    .select("id")
    .all()

  if (recentRows.length >= OTP_RATE_LIMIT_MAX_REQUESTS) {
    return { ok: false, reason: "rate_limited" }
  }

  const code = generateOtp()
  await db.orm.public.OtpChallenge.create({
    phone,
    codeHash: hashOtp(code),
    expiresAt: new Date(Date.now() + OTP_TTL_SECONDS * 1000).toISOString(),
  })

  await provider.sendOtp(phone, code)

  return { ok: true }
}

export type VerifyOtpResult =
  | { status: "verified" }
  | { status: "invalid_or_expired" }
  | { status: "attempts_exhausted" }

export async function verifyOtp(
  phone: string,
  code: string,
): Promise<VerifyOtpResult> {
  const challenge = await db.orm.public.OtpChallenge.where({ phone })
    .orderBy((o) => o.createdAt.desc())
    .first()

  if (!challenge) return { status: "invalid_or_expired" }

  if (new Date(challenge.expiresAt).getTime() < Date.now()) {
    await db.orm.public.OtpChallenge.where({ id: challenge.id }).delete()
    return { status: "invalid_or_expired" }
  }

  if (challenge.attempts >= OTP_MAX_ATTEMPTS) {
    await db.orm.public.OtpChallenge.where({ id: challenge.id }).delete()
    return { status: "attempts_exhausted" }
  }

  if (!otpMatches(code, challenge.codeHash)) {
    await db.orm.public.OtpChallenge.where({ id: challenge.id }).update({
      attempts: challenge.attempts + 1,
    })
    if (challenge.attempts + 1 >= OTP_MAX_ATTEMPTS) {
      return { status: "attempts_exhausted" }
    }
    return { status: "invalid_or_expired" }
  }

  await db.orm.public.OtpChallenge.where({ phone }).delete()
  return { status: "verified" }
}

export function isValidOtpCode(code: string): boolean {
  return typeof code === "string" && /^\d{6}$/.test(code)
}
const COUNTRY_CODE = "+91"

const INDIAN_PHONE_PATTERN = /^[6-9]\d{9}$/

export function normalizePhone(input: string): string | null {
  if (typeof input !== "string") return null

  let digits = input.replace(/\D/g, "")

  if (digits.startsWith("0")) digits = digits.slice(1)
  if (digits.startsWith("91") && digits.length > 10) digits = digits.slice(2)

  if (!INDIAN_PHONE_PATTERN.test(digits)) return null

  return `${COUNTRY_CODE}${digits}`
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  const national = digits.length > 10 ? digits.slice(-10) : digits
  return `+91 ${national.slice(0, 5)} ${national.slice(5)}`
}
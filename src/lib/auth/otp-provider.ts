export interface OTPProvider {
  sendOtp(phone: string, code: string): Promise<void>
}

/**
 * Development-only OTP provider.
 *
 * Never ships a real SMS. Logs the OTP to the server console so the full
 * phone + OTP flow can be exercised locally. Guarded so it can never be
 * selected outside of development / a test environment.
 */
class MockOTPProvider implements OTPProvider {
  async sendOtp(phone: string, code: string): Promise<void> {
    if (process.env.NODE_ENV === "production") {
      throw new Error("MockOTPProvider must never be used in production.")
    }
    console.log(
      `[safentity][dev-mock-otp] OTP for ${phone} is ${code} (expires in 5 minutes)`,
    )
  }
}

const PROVIDER_NAMES = new Set(["mock", "twilio", "msg91", "custom"])

/**
 * Resolves the configured OTP provider.
 *
 * Set OTP_PROVIDER=mock (default) during development, or the name of a real
 * provider once one is wired up. Unknown provider names fall back to the mock
 * provider in development and throw in production, so a missing SMS
 * integration can never silently break a live deployment.
 */
export function getOTPProvider(): OTPProvider {
  const name = (process.env.OTP_PROVIDER?.trim() || "mock").toLowerCase()

  if (!PROVIDER_NAMES.has(name)) {
    throw new Error(
      `Unknown OTP_PROVIDER "${name}". Supported values: ${[...PROVIDER_NAMES].join(", ")}.`,
    )
  }

  switch (name) {
    case "mock":
      return new MockOTPProvider()
    case "custom":
      return getCustomProvider()
    case "twilio":
    case "msg91":
      throw new Error(
        `OTP_PROVIDER "${name}" is reserved but no implementation is configured yet. ` +
          `Wire the provider in ${"src/lib/auth/otp-provider.ts"} and add its credentials to .env.local.`,
      )
    default: {
      if (process.env.NODE_ENV === "production") {
        throw new Error(`No SMS provider configured for OTP_PROVIDER "${name}".`)
      }
      return new MockOTPProvider()
    }
  }
}

function getCustomProvider(): OTPProvider {
  const send = process.env.OTP_CUSTOM_SEND_URL
  if (!send) throw new Error("OTP_CUSTOM_SEND_URL is required for the custom provider.")
  return {
    async sendOtp(phone, code) {
      const response = await fetch(send, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      })
      if (!response.ok) {
        throw new Error(`SMS provider returned ${response.status}.`)
      }
    },
  }
}
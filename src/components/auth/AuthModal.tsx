"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react"
import { Loader2, User, X } from "lucide-react"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/context/AuthContext"
import { formatPhone, normalizePhone } from "@/lib/auth/phone"
import { cn } from "@/lib/utils"

type Step = "phone" | "otp"

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function Spinner({ label }: { label: string }) {
  return (
    <>
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </>
  )
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { requestOtp, verifyOtp } = useAuth()

  const [step, setStep] = useState<Step>("phone")
  const [phoneInput, setPhoneInput] = useState("")
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [countdown, setCountdown] = useState(RESEND_SECONDS)

  const phoneRef = useRef<HTMLInputElement>(null)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const phone = normalizePhone(`+91${phoneInput}`)

  const close = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  useEffect(() => {
    if (open && step === "phone") phoneRef.current?.focus()
  }, [open, step])

  useEffect(() => {
    if (step === "otp") {
      const firstEmpty = digits.findIndex((d) => !d)
      const target = firstEmpty === -1 ? OTP_LENGTH - 1 : firstEmpty
      window.setTimeout(() => otpRefs.current[target]?.focus(), 0)
    }
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (step !== "otp" || countdown <= 0) return
    const timer = window.setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [step, countdown])

  function handlePhoneChange(value: string) {
    setPhoneInput(value.replace(/\D/g, "").slice(0, 10))
    setError(null)
  }

  async function handleGetOtp() {
    if (!phone) {
      setError("Please enter a valid 10-digit Indian mobile number.")
      if (step === "phone") phoneRef.current?.focus()
      return
    }
    if (submitting) return

    setSubmitting(true)
    setError(null)
    try {
      await requestOtp(phone)
      setDigits(Array(OTP_LENGTH).fill(""))
      setCountdown(RESEND_SECONDS)
      setStep("otp")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send OTP. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVerify() {
    if (!phone) {
      setStep("phone")
      return
    }
    const otp = digits.join("")
    if (otp.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.")
      return
    }
    if (submitting) return

    setSubmitting(true)
    setError(null)
    try {
      await verifyOtp(phone, otp, email || null)
      onOpenChange(false)
      toast.success("Welcome to Safentity")
    } catch (err) {
      setDigits(Array(OTP_LENGTH).fill(""))
      setError(
        err instanceof Error ? err.message : "Verification failed. Please try again.",
      )
      window.setTimeout(() => otpRefs.current[0]?.focus(), 0)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResend() {
    if (!phone || resending || countdown > 0) return
    setResending(true)
    setError(null)
    try {
      await requestOtp(phone)
      setDigits(Array(OTP_LENGTH).fill(""))
      setCountdown(RESEND_SECONDS)
      toast.success("OTP resent")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend OTP.")
    } finally {
      setResending(false)
    }
  }

  function changeNumber() {
    setStep("phone")
    setDigits(Array(OTP_LENGTH).fill(""))
    setError(null)
  }

  function handleOtpChange(index: number, raw: string) {
    const clean = raw.replace(/\D/g, "")
    const value = clean.slice(-1)
    setDigits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
    setError(null)
    if (value && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus()
  }

  function handleOtpKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  function handleOtpPaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
    if (!pasted) return
    setDigits(() => {
      const next = Array(OTP_LENGTH).fill("")
      for (let i = 0; i < pasted.length; i += 1) next[i] = pasted[i]
      return next
    })
    const nextIndex = pasted.length >= OTP_LENGTH ? OTP_LENGTH - 1 : pasted.length
    window.setTimeout(() => otpRefs.current[nextIndex]?.focus(), 0)
  }

  const otpIncomplete = digits.some((d) => !d)

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 sm:max-w-[420px] sm:p-6"
        >
          <DialogPrimitive.Title className="sr-only">
            Sign in or sign up
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Authenticate with your mobile number and one-time password.
          </DialogPrimitive.Description>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <User className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Sign In or Sign Up
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
            >
              <X className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
          </div>

          {/* Heading */}
          <div className="mt-5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {step === "phone" ? "Welcome to Safentity" : "Enter OTP"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {step === "phone"
                ? "Enter your mobile number to continue"
                : phone
                  ? `Enter the 6-digit OTP sent to ${formatPhone(phone)}`
                  : "Enter the 6-digit OTP sent to your mobile number"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
            >
              {error}
            </div>
          )}

          {/* Body */}
          <div className="mt-5">
            {step === "phone" ? (
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault()
                  void handleGetOtp()
                }}
                noValidate
              >
                <div>
                  <label
                    htmlFor="auth-mobile"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Mobile number
                  </label>
                  <div
                    className={cn(
                      "flex h-12 overflow-hidden rounded-lg border border-input bg-white transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/40",
                      error && "border-destructive focus-within:border-destructive",
                    )}
                  >
                    <span className="flex items-center gap-1 border-r border-border bg-muted/60 px-3 text-sm font-medium text-foreground">
                      +91
                      <span className="h-4 w-px bg-border" aria-hidden="true" />
                    </span>
                    <input
                      id="auth-mobile"
                      ref={phoneRef}
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="Mobile Number"
                      value={phoneInput}
                      onChange={(event) => handlePhoneChange(event.target.value)}
                      className="h-full w-full bg-transparent px-3 text-base text-foreground outline-none placeholder:text-muted-foreground"
                      aria-invalid={error ? true : undefined}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="auth-email"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Email (optional)
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-lg border border-input bg-white px-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/40"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-2.5 pt-0.5 select-none">
                  <Checkbox
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(Boolean(checked))}
                    className="mt-0.5 shrink-0"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    I agree to receive calls and messages from Safentity.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting || !phone}
                  className="group/btn flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-white transition-all hover:bg-brand-dark active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
                >
                  {submitting ? (
                    <Spinner label="Sending OTP" />
                  ) : (
                    <>
                      <span>GET OTP</span>
                      <Loader2
                        className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover/btn:translate-x-0 group-hover/btn:opacity-100 group-data-[disabled=true]/btn:hidden"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault()
                  void handleVerify()
                }}
                noValidate
              >
                <div className="flex items-center justify-center gap-2">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpRefs.current[index] = el
                      }}
                      type="tel"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={2}
                      value={digit}
                      aria-label={`Digit ${index + 1}`}
                      onChange={(event) => handleOtpChange(index, event.target.value)}
                      onKeyDown={(event) => handleOtpKeyDown(index, event)}
                      onPaste={(event) => handleOtpPaste(event)}
                      className={cn(
                        "h-12 w-11 rounded-lg border border-input bg-white text-center text-lg font-semibold text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/40",
                        error && "border-destructive focus:border-destructive",
                      )}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={submitting || otpIncomplete}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-white transition-all hover:bg-brand-dark active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
                >
                  {submitting ? (
                    <Spinner label="Verifying OTP" />
                  ) : (
                    <span>VERIFY &amp; CONTINUE</span>
                  )}
                </button>

                <div className="flex flex-col items-center gap-1 pt-1 text-center text-sm">
                  <p className="text-muted-foreground">
                    Didn&apos;t receive the OTP?
                  </p>
                  {countdown > 0 ? (
                    <span className="text-muted-foreground">
                      Resend OTP in {countdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void handleResend()}
                      disabled={resending}
                      className="font-semibold text-brand transition-colors hover:text-brand-dark disabled:opacity-50"
                    >
                      {resending ? "Sending…" : "Resend OTP"}
                    </button>
                  )}
                </div>

                <div className="border-t border-border/60 pt-3 text-center">
                  <button
                    type="button"
                    onClick={changeNumber}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Change mobile number
                  </button>
                </div>
              </form>
            )}
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
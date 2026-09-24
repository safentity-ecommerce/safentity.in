"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react"

export interface AuthUser {
  id: string
  phone: string | null
  name: string | null
  email: string | null
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  requestOtp: (phone: string) => Promise<void>
  verifyOtp: (phone: string, otp: string, email?: string | null) => Promise<void>
  signout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const API_ERROR_MESSAGE = "Something went wrong. Please try again."

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  })

  const data = (await response.json().catch(() => ({}))) as {
    user?: AuthUser | null
    error?: string
  }

  if (!response.ok) {
    throw new Error(data.error ?? API_ERROR_MESSAGE)
  }

  return data as T
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const setUserFromResponse = useCallback((data: { user?: AuthUser | null }) => {
    setUser(data.user ?? null)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const data = await request<{ user: AuthUser | null }>("/api/auth/me", {
        cache: "no-store",
      })
      setUserFromResponse(data)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [setUserFromResponse])

  useEffect(() => {
    let cancelled = false

    async function loadUser() {
      try {
        const data = await request<{ user: AuthUser | null }>("/api/auth/me", {
          cache: "no-store",
        })
        if (!cancelled) setUserFromResponse(data)
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void loadUser()

    return () => {
      cancelled = true
    }
  }, [setUserFromResponse])

  const requestOtp = useCallback(async (phone: string) => {
    await request<{ ok: boolean }>("/api/auth/otp/request", {
      method: "POST",
      body: JSON.stringify({ phone }),
    })
  }, [])

  const verifyOtp = useCallback(
    async (phone: string, otp: string, email?: string | null) => {
      const data = await request<{ user: AuthUser }>("/api/auth/otp/verify", {
        method: "POST",
        body: JSON.stringify({ phone, otp, email: email || null }),
      })
      setUserFromResponse(data)
    },
    [setUserFromResponse],
  )

  const signout = useCallback(async () => {
    try {
      await request<{ ok: boolean }>("/api/auth/signout", { method: "POST" })
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({ user, isLoading, requestOtp, verifyOtp, signout, refreshUser }),
    [user, isLoading, requestOtp, verifyOtp, signout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default AuthContext
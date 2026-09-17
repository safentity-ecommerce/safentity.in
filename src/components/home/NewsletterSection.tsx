"use client"

import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Stay Updated with Safentity
            </h2>
            <p className="mt-3 text-white/60 max-w-md mx-auto">
              Get the latest product updates, industry insights, and exclusive
              offers delivered to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                aria-label="Work email address"
                className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                required
              />
              <Button className="h-11 px-6 bg-brand hover:bg-brand-dark text-white shrink-0 cursor-not-allowed">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="mt-4 text-xs text-white/40">
              We respect your privacy. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

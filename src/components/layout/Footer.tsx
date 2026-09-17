import Link from "next/link"
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react"
import { SITE_NAME, CONTACT_NUMBER } from "@/lib/config"

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "Spill Protection", href: "/categories/spill-protection" },
      // {
      //   label: "Eye & Face Protection",
      //   href: "/categories/eye-face-protection",
      // },
      {
        label: "Respiratory Protection",
        href: "/categories/respiratory-protection",
      },
      { label: "Heat Protection", href: "/categories/heat-protection" },
      { label: "Fire Protection", href: "/categories/fire-protection" },
      { label: "Fall Protection", href: "/categories/fall-protection" },
      { label: "LOTO", href: "/categories/lockout-tagout" },
      { label: "General Equipments", href: "/categories/general-equipments" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="container pt-16 pb-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-5 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand shadow-lg shadow-brand/20 transition-transform group-hover:scale-105">
                <span className="text-lg font-bold text-white">S</span>
              </div>

              <span className="text-2xl font-bold tracking-tight">
                {SITE_NAME}
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-white/55">
              India&apos;s trusted B2B marketplace for industrial safety
              equipment. Helping businesses create safer workplaces with
              reliable products and professional support.
            </p>

            {/* Contact */}
            <div className="mt-7 space-y-3">
              <a
                href={`tel:${CONTACT_NUMBER}`}
                className="group flex items-center gap-3 text-sm text-white/75 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.07] ring-1 ring-white/10 transition-colors group-hover:bg-brand">
                  <Phone className="h-4 w-4" />
                </span>
                <span>{CONTACT_NUMBER}</span>
              </a>

              <a
                href="mailto:info@safentity.in"
                className="group flex items-center gap-3 text-sm text-white/75 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.07] ring-1 ring-white/10 transition-colors group-hover:bg-brand">
                  <Mail className="h-4 w-4" />
                </span>
                <span>safentity@outlook.com</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-white/75">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.07] ring-1 ring-white/10">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="leading-6">
                  Faridabad, Haryana
                  <br />
                  India - 121002
                </span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/90">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm text-white/50 transition-all hover:translate-x-1 hover:text-white"
                    >
                      <span className="mr-2 h-px w-0 bg-brand transition-all group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Business CTA */}
          <div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold">Need safety equipment?</h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Tell us what your business needs. Our team can help you find the
                right industrial safety equipment.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-all hover:gap-3 hover:brightness-110"
              >
                Talk to us
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-white/35">
              © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/35">
              <span>Genuine Products</span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span>GST Invoice</span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

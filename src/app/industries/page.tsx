import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Factory } from "lucide-react"
import { industries } from "@/lib/data/industries"

export const metadata: Metadata = {
  title: "Industries | Safentity",
  description:
    "Safety solutions tailored for construction, manufacturing, oil & gas, chemical, pharmaceutical, and mining industries.",
}

export default function IndustriesPage() {
  return (
    <div className="container py-6 lg:py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Industries</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Solutions by Industry</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Safety solutions tailored for your industry
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {industries.map((industry) => (
          <Link
            key={industry.id}
            href={`/industries/${industry.slug}`}
            className="group flex flex-col gap-4 rounded-xl border bg-card p-5 transition-all duration-200 hover:shadow-sm hover:border-border/80"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-brand group-hover:text-white">
                <Factory className="h-6 w-6 text-muted-foreground group-hover:text-white" />
              </div>
              <h2 className="font-semibold leading-snug group-hover:text-brand transition-colors">
                {industry.name}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">{industry.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {industry.solutions.slice(0, 3).map((solution) => (
                <span
                  key={solution}
                  className="px-2 py-0.5 text-[10px] rounded bg-muted text-muted-foreground"
                >
                  {solution}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

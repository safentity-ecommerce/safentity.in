import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Factory, Shield } from "lucide-react"
import { industries } from "@/lib/data/industries"
import { categories } from "@/lib/data/categories"

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const industry = industries.find((i) => i.slug === slug)
    if (!industry) return { title: "Industry not found" }
    return {
      title: `${industry.name} | Safentity`,
      description: industry.description,
    }
  })
}

function categorySlugForSolution(solution: string): string | undefined {
  const firstWord = solution.split(" ")[0].toLowerCase()
  return categories.find(
    (category) => category.name.split(" ")[0].toLowerCase() === firstWord,
  )?.slug
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = industries.find((i) => i.slug === slug)

  if (!industry) {
    notFound()
  }

  return (
    <div className="container py-6 lg:py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href="/industries"
          className="hover:text-foreground transition-colors"
        >
          Industries
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{industry.name}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Factory className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{industry.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {industry.description}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-brand" />
          Recommended safety solutions
        </h2>
        <div className="flex flex-wrap gap-2">
          {industry.solutions.map((solution) => {
            const categorySlug = categorySlugForSolution(solution)
            if (categorySlug) {
              return (
                <Link
                  key={solution}
                  href={`/categories/${categorySlug}`}
                  className="px-3 py-1.5 text-sm rounded-lg border bg-card hover:bg-muted transition-colors"
                >
                  {solution}
                </Link>
              )
            }
            return (
              <span
                key={solution}
                className="px-3 py-1.5 text-sm rounded-lg border bg-muted text-muted-foreground"
              >
                {solution}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

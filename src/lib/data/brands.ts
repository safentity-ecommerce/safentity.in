import type { Brand } from "@/types"
import { proudProducts } from "@/lib/data/products"

export const featuredBrands: Brand[] = [
  {
    id: "b1",
    name: "3M",
    slug: "3m",
    logo: "",
    productCount: 1245,
    isFeatured: true,
  },
  {
    id: "b2",
    name: "Honeywell",
    slug: "honeywell",
    logo: "",
    productCount: 987,
    isFeatured: true,
  },
  {
    id: "b3",
    name: "MSA Safety",
    slug: "msa-safety",
    logo: "",
    productCount: 654,
    isFeatured: true,
  },
  {
    id: "b4",
    name: "Ansell",
    slug: "ansell",
    logo: "",
    productCount: 432,
    isFeatured: true,
  },
  {
    id: "b5",
    name: "RESQ",
    slug: "resq",
    logo: "",
    productCount: 432,
    isFeatured: true,
  },
]

export const allBrands: Brand[] = [
  ...featuredBrands,
  ...proudProducts
    .filter((p) => !featuredBrands.some((b) => b.slug === p.brandSlug))
    .map((p) => ({
      id: `brand-${p.brandSlug}`,
      name: p.brand,
      slug: p.brandSlug,
      logo: "",
      productCount: proudProducts.filter((x) => x.brandSlug === p.brandSlug)
        .length,
      isFeatured: false,
    })),
]

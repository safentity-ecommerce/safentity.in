import { ProudProducts } from "@/components/home/ProudProducts"
import { NewsletterSection } from "@/components/home/NewsletterSection"
import Categories from "@/components/home/Categories"
import ThreeBanners from "@/components/home/ThreeBanners"
import MarqueeBanner from "@/components/home/MarqueeBanner"

export default function HomePage() {
  return (
    <>
      <Categories />
      <ThreeBanners />
      <ProudProducts />
      <MarqueeBanner />
      <NewsletterSection />
    </>
  )
}

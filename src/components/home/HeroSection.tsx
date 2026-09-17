import { BannerCarousel } from "./BannerCarousel"

export function HeroSection() {
  return (
    <section className="py-16 lg:py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full h-[250px] md:h-[400px] lg:h-[550px]">
            <BannerCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}

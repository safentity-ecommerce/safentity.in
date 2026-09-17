import Image from "next/image"

const brands = [
  { src: "/images/brands/resq-spill-safe.png", alt: "Resq Spill Safe" },
  { src: "/images/brands/karam.png", alt: "karam" },
  { src: "/images/brands/resq-loto-tech.jpeg", alt: "3M" },
  { src: "/images/brands/resq.jpg", alt: "RESQ" },
  { src: "/images/brands/udyogi-logo.jpg", alt: "udyogi" },
  { src: "/images/brands/care.jpeg", alt: "Care" },
  { src: "/images/brands/thadhani.webp", alt: "Chennai Petroleum" },
]

export default function Client() {
  return (
    <section className="bg-surface-light py-[5.3rem] overflow-hidden">
      <div className="container">
        <div className="flex flex-col">
          <div className="text-primary">
            <h2 className="text-3xl font-bold !mb-10">Brands We Work With</h2>
          </div>

          {/* Marquee */}
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-marquee items-center">
              {/* First set */}
              {brands.map((client) => (
                <div
                  key={`first-${client.alt}`}
                  className="mx-10 flex h-34 w-[160px] shrink-0 items-center justify-center"
                >
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={160}
                    height={100}
                    className="h-24 w-auto object-contain"
                  />
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {brands.map((client) => (
                <div
                  key={`second-${client.alt}`}
                  className="mx-10 flex h-34 w-[160px] shrink-0 items-center justify-center"
                >
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={160}
                    height={100}
                    className="h-24 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

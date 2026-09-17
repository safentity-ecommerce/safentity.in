import Image from "next/image"

const ThreeBanners = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Image
            src="/images/banner/uni01-v2.png"
            alt="Banner 1"
            width={600}
            height={300}
            className="w-full h-auto rounded-xl object-cover border-2"
          />

          <Image
            src="/images/banner/windsock-v2.png"
            alt="Banner 2"
            width={600}
            height={300}
            className="w-full h-auto rounded-xl object-cover border-2"
          />

          <Image
            src="/images/banner/goggle.png"
            alt="Banner 3"
            width={600}
            height={300}
            className="w-full h-auto rounded-xl object-cover border-2"
          />
        </div>
      </div>
    </section>
  )
}

export default ThreeBanners

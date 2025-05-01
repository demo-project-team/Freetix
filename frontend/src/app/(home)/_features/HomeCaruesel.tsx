'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
const HomeCaruesel = ()=>{
    return(
        <section id="home" className="relative w-full h-screen">
        <Carousel
          className="w-full h-full"
          plugins={[Autoplay({ delay: 5000 })]}
        >
          <CarouselContent>
            <CarouselItem className="w-full h-screen">
              <div className="relative w-full h-full">
                <Image
                  src="/images/pczurag.jpg"
                  alt="Gaming Room 1"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
                  <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Улаанбаатар хотын хамгийн шилдэг
                    <br /> компьютер тоглоомын газрууд
                  </h1>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="w-full h-screen">
              <div className="relative w-full h-full">
                <Image
                  src="/images/gaming-room-2.jpg"
                  alt="Gaming Room 2"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
                  <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Цахимаар захиал Цагаа хэмнэ
                  </h1>

                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="w-full h-screen">
              <div className="relative w-full h-full">
                <Image
                  src="/images/gaming-room-3.jpg"
                  alt="Gaming Room 3"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
                  <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Тав тухтай орчин таныг хүлээж байна
                  </h1>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
        </Carousel>
      </section>
    )
}
export default HomeCaruesel
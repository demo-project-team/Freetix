"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-blue-400 to-indigo-500 bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🎮</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Meta
          </span>
        </div>

        <div className="hidden md:flex space-x-6 text-lg">
          <a
            href="#login"
            className="hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
          >
            Нэвтрэх
          </a>
          <a
            href="#booking"
            className="hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
          >
            Ширээ захиалах
          </a>
          <a
            href="#viewed"
            className="hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
          >
            Үзсэн
          </a>
          <a
            href="#wallet"
            className="hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
          >
            Хэтэвч
          </a>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <a href="#login" className="text-blue-400">
            Нэвтрэх
          </a>
          <a href="#viewed" className="text-blue-400">
            Үзсэн
          </a>
          <a href="#wallet" className="text-blue-400">
            Хэтэвч
          </a>
        </div>
      </header>

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
                  <a
                    href="#booking"
                    className="mt-4 inline-block bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold py-4 px-8 rounded-full text-xl border-2 border-blue-400 hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
                  >
                    Захиалга өгөх
                  </a>
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
                  <a
                    href="#booking"
                    className="mt-4 inline-block bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold py-4 px-8 rounded-full text-xl border-2 border-blue-400 hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
                  >
                    Захиалга өгөх
                  </a>
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
                  <a
                    href="#booking"
                    className="mt-4 inline-block bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold py-4 px-8 rounded-full text-xl border-2 border-blue-400 hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
                  >
                    Захиалга өгөх
                  </a>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
        </Carousel>
      </section>

      <section
        id="pricing"
        className="w-full py-24 bg-gradient-to-b from-indigo-900 via-purple-800 to-blue-900 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span>💸</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Компьютер Тоглоомын Газрууд
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white bg-opacity-10 rounded-2xl shadow-2xl p-8 hover:scale-105 hover:bg-opacity-20 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300">
              <Image
                src="/images/gaming-room-1.jpg"
                alt="Gaming Room 1"
                className="rounded-xl mb-4 object-cover h-64 w-full"
                width={500}
                height={300}
              />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Skol Gaming Center
              </h3>
              <p className="mb-2 text-lg text-black">
                <span>🕐</span> Цагийн үнэ:{" "}
                <span className="font-bold">5,000₮</span>
              </p>
              <p className="mb-6 text-lg text-black">
                <span>🗓️</span> Бүтэн өдөр:{" "}
                <span className="font-bold">40,000₮</span>
              </p>
              <a
                href="#booking"
                className="inline-block mt-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold py-2 px-6 rounded-full border-2 border-blue-400 hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
              >
                Ширээ захиалах
              </a>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl shadow-2xl p-8 hover:scale-105 hover:bg-opacity-20 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300">
              <Image
                src="/images/gaming-room-2.jpg"
                alt="Gaming Room 2"
                className="rounded-xl mb-4 object-cover h-64 w-full"
                width={500}
                height={300}
              />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Meta e-sport
              </h3>
              <p className="mb-2 text-lg text-black">
                <span>🕐</span> Цагийн үнэ:{" "}
                <span className="font-bold">4,000₮</span>
              </p>
              <p className="mb-6 text-lg text-black">
                <span>🗓️</span> Бүтэн өдөр:{" "}
                <span className="font-bold">24,000₮</span>
              </p>
              <a
                href="#booking"
                className="inline-block mt-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold py-2 px-6 rounded-full border-2 border-blue-400 hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
              >
                Ширээ захиалах
              </a>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl shadow-2xl p-8 hover:scale-105 hover:bg-opacity-20 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300">
              <Image
                src="/images/gaming-room-3.jpg"
                alt="Gaming Room 3"
                className="rounded-xl mb-4 object-cover h-64 w-full"
                width={500}
                height={300}
              />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                GATE e-sport
              </h3>
              <p className="mb-2 text-lg text-black">
                <span>🕐</span> Цагийн үнэ:{" "}
                <span className="font-bold">4,000₮</span>
              </p>
              <p className="mb-6 text-lg text-black">
                <span>🗓️</span> Бүтэн өдөр:{" "}
                <span className="font-bold">15,000₮</span>
              </p>
              <a
                href="#booking"
                className="inline-block mt-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold py-2 px-6 rounded-full border-2 border-blue-400 hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
              >
                Ширээ захиалах
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="#more-pcs"
              className="inline-block bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold py-4 px-8 rounded-full text-xl border-2 border-blue-400 hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
            >
              Бүх тоглоомын газрыг харах
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Бидэнтэй Холбогдох
              </h3>
              <ul>
                <li className="mb-2">
                  <span className="font-semibold">📧</span> И-мэйл:{" "}
                  <a
                    href="mailto:metaesport@gmail.com"
                    className="text-blue-400 hover:text-blue-500"
                  >
                    metaesport@gmail.com
                  </a>
                </li>
                <li className="mb-2">
                  <span className="font-semibold">📞</span> Утас:{" "}
                  <a className="text-blue-400 hover:text-blue-500">
                    +976 7555-5555
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

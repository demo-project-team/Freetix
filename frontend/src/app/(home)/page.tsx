/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import HomeCaruesel from "./_features/HomeCaruesel";
import { useUserVendor } from "@/provider/VendorProvderUser";
import VendorCardSkelton from "./_components/VendorCardSkelton";
import TerminalCard from "@/components/TerminalCard";
import FunnyEye from "@/components/FunnyEye";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const { vendors, isLoading } = useUserVendor();

  return (
    <div className="flex flex-col min-h-screen text-blue-400 to-indigo-500">
      <div>
        <TerminalCard />
        <div className="absolute w-fit left-15 top-30 z-10 -rotate-25">
          <FunnyEye />
        </div>
      </div>
      <HomeCaruesel />
      <section
        id="pricing"
        className="w-full py-24 from-indigo-900 via-purple-800 to-blue-900 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span>💸</span>{" "}
           <span className="bg-gradient-to-r from-[#00ffff] to-[#0066ff] drop-shadow-[0_0_25px_rgba(0,255,255,0.8)] bg-clip-text text-transparent">
  Компьютер Тоглоомын Газрууд
</span>

          </h2>

          {!isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {vendors.map((vendor) => (
                <div
                  onClick={() => router.push(`/pc?vendorid=${vendor.id}`)}
                  key={vendor.id}
                  className="bg-white bg-opacity-10 rounded-2xl shadow-2xl p-8 hover:scale-105 hover:bg-opacity-20 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
                >
                  <img
                    src={vendor.imageUrl ? vendor.imageUrl : "pczurag.jpg"}
                    alt="Gaming Room 1"
                    className="rounded-xl mb-4 object-cover h-64 w-full"
                  />
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    {vendor.name}
                  </h3>
                  <p className="mb-2 text-lg text-black">
                    <span>🕐</span> Цагийн үнэ:{" "}
                    <span className="font-bold">5,000₮</span>
                  </p>
                  <p className="mb-6 text-lg text-black">
                    <span>🌙</span> Night pass:{" "}
                    <span className="font-bold">40,000₮</span>
                  </p>
                  <button className="inline-block mt-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-bold py-2 px-6 rounded-full border-2 border-blue-400 hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300">
                    Захиалга өгөх
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {Array.from({ length: 3 }).map((_, i) => (
                <VendorCardSkelton key={i} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/game-see")}
              className="inline-block bg-gradient-to-r from-[#00ffff] to-[#0066ff] drop-shadow-[0_0_25px_rgba(0,255,255,0.8)] bg-clip-text text-transparent font-bold py-4 px-8 rounded-full text-xl border-2 border-blue-400 hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
            >
              Бүх тоглоомын газрыг харах
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

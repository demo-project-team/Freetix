"use client";

import { useUserVendor } from "@/provider/VendorProvderUser";
import { Vendor } from "@/Types/types";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { useState } from "react";
import TopGlowCard from "@/components/TopGlowCard";
import BackCard from "@/components/MainCard";
import Footer from "@/components/Footer";

const VendorMap = dynamic<{ vendors: Vendor[] }>(
  () => import("./_components/Location"),
  { ssr: false }
);

export default function GameSee() {
  const { vendors, isLoading } = useUserVendor();
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();

  if (vendors.length < 1 || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="">
      <div className="relative overflow-hidden mb-8">
        <div className="relative z-10 py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Тоглоомын газрууд
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-4">
              Улаанбаатар хотын шилдэг тоглоомын газрууд нэг дороос
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto -mt-6">
        <TopGlowCard>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[60px]">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => router.push(`/pc?vendorid=${vendor.id}`)}
                className="cursor-pointer"
              >
                <BackCard vendor={vendor} />
              </div>
            ))}
          </div>
        </TopGlowCard>

        {/* Floating Map Toggle Button */}
        <button
          onClick={() => setShowMap(!showMap)}
          className="fixed bottom-6 right-[130px] z-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all"
        >
          {showMap ? "Газрын зураг хаах" : "Газрын зураг харах"}
        </button>

        {/* Floating Mini Map */}
        {showMap && (
          <div className="fixed bottom-20 right-[130px] z-30 w-[360px] h-[300px] rounded-xl overflow-hidden shadow-2xl border border-purple-500 bg-white">
            <VendorMap vendors={vendors} />
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

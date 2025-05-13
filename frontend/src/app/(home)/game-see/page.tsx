/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useUserVendor } from "@/provider/VendorProvderUser";
import { Vendor } from "@/Types/types";
import { Map, Star, Timer, Phone, Info,} from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { useState } from "react";
import TopGlowCard from "@/components/TopGlowCard";
import BackCard from "@/components/MainCard";

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
      <div className="relative overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[60px]">
            {vendors.map((vendor) => (
              <div
                onClick={() => router.push(`/pc?vendorid=${vendor.id}`)}
                key={vendor.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-600/20 hover:scale-105 relative group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-r from-purple-900/30 to-pink-900/30 relative">
                  <img
                    src={vendor.imageUrl || "/next.svg"}
                    className="w-[485px] h-[195px]"
                  />
                  <div className="absolute top-4 right-4 flex items-center bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star
                      size={16}
                      className="text-yellow-400 mr-1"
                      fill="currentColor"
                    />
                    <span className="font-medium text-sm">
                      {vendor.email || "N/A"}
                    </span>
                  </div>
                  {vendor.address && (
                    <div className="absolute bottom-4 left-4 bg-purple-700/90 text-xs font-medium px-3 py-1 rounded-full">
                      {vendor.address?.street || "Бусад"}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-3">{vendor.name}</h2>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div className="flex items-center gap-3">
                      <Map size={18} className="text-purple-400" />
                      <p>{vendor.address?.SumOrKhoroo || "Хаяг оруулаагүй"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-purple-400" />
                      <p>{vendor.phone || "Утасны дугаар байхгүй"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Timer size={18} className="text-purple-400" />
                      <p>
                        {vendor.createdAt?.toString().split("T")[0] ||
                          "Огноо байхгүй"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[60px]">
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
    </div>
  );
}

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

// import { Input } from "@/components/ui/input";
// import { useState } from "react";
import { useUserVendor } from "@/provider/VendorProvderUser";
import { Vendor } from "@/Types/types";
import { Map, Star, Timer, Phone, Info } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import PcLoadingAnimation from "../pc/pcLoadingAnimation";
import VendorSearch from "./_components/VendorSearch";
import OptimizedParticlesEffect from "@/components/ParticlesBackground";
import LoadingScreen from "@/components/LoadingScreen";
import TerminalCard from "@/components/TerminalCard";

type VendorMapSelectorProps = {
  vendors: Vendor[];
};
const VendorMap = dynamic<VendorMapSelectorProps>(
  () => import("./_components/Location"),
  { ssr: false }
);

export default function GameSee() {
  // const [searchTerm, setSearchTerm] = useState("");
  const { vendors } = useUserVendor();
  const router = useRouter();

  // const filteredVendors = vendors.filter((vendor) =>
  //   vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   vendor.address?.street?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   vendor.phone?.includes(searchTerm)
  // );

  console.log(vendors);
  if (vendors.length < 1) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-12">
      {/*Pracicle Backround эхлэл хэсэг*/}

      <section className="relative min-h-screen">
        <OptimizedParticlesEffect className="absolute inset-0" />
        {/* Бусад UI */}
      </section>
      {/* Pracicle Backround төгсгөл хэсэг */}
      <div className="relative bg-gray-800 overflow-hidden ">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 bg-black py-16 px-4">
          <VendorSearch vendors={vendors} />

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

      <div className="container mx-auto px-4 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[60px]">
          {vendors.map((vendor) => (
            <div
              onClick={() => router.push(`/pc?vendorid=${vendor.id}`)}
              key={vendor.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-600/20 hover:scale-105 relative group cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-r from-purple-900/30 to-pink-900/30 relative">
                <div className="flex items-center justify-center h-full text-purple-300">
                  <div className="text-center">
                    <div className="flex justify-center"></div>
                    <img
                      src={vendor.imageUrl ? vendor.imageUrl : "/next.svg"}
                      className="w-[485px] h-[195px]"
                    />
                  </div>
                </div>
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
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold">{vendor.name}</h2>
                </div>

                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center gap-3">
                    <Map size={18} className="text-purple-400" />
                    <p className="text-sm">
                      {vendor.address?.SumOrKhoroo || "Хаяг оруулаагүй байна"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-purple-400" />
                    <p className="text-sm">
                      {vendor.phone || "Утасны дугаар байхгүй"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Timer size={18} className="text-purple-400" />
                    <p className="text-sm">
                      {vendor.createdAt?.toString().split("T")[0] ||
                        (vendor.createdAt &&
                          `Бүртгэгдсэн: ${
                            vendor.createdAt?.toString().split("T")[0]
                          }`)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
        <div className="overflow-hidden h-[400px] max-w-[4000px] rounded-xl shadow-md mt-[25px]">
          <VendorMap vendors={vendors} />
        </div>
        {vendors?.length === 0 && (
          <div className="text-center py-20">
            <div className="flex justify-center mb-4">
              <Info size={48} className="text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-400">
              Тоглоомын газрууд олдсонгүй
            </h3>
            <p className="text-gray-500 mt-2">
              Одоогоор бүртгэлтэй тоглоомын газар алга байна
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

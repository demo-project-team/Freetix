"use client";

import { useUserVendor } from "@/provider/VendorProvderUser";
import { Map, Star, Timer, Phone, Info,  } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function GameSee() {
  const [filter, setFilter] = useState("all");
  const { vendors } = useUserVendor();

const router = useRouter();

  useEffect(() => {
    if (vendors?.length) {
      const uniqueCategories = [
        ...new Set(vendors.map((vendor) => vendor.name || "Бусад")),
      ];
      console.log(uniqueCategories);
    }
  }, [vendors]);

  const filteredVendors = vendors?.filter((vendor) =>
    filter === "all" ? true : vendor.email === filter || vendor.email === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-12">
      <div className="relative bg-gray-800 overflow-hidden ">
        <div className="absolute inset-0 bg-purple-900 opacity-10"></div>
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

      <div className="container mx-auto px-4 -mt-6">
      <div className="container mx-auto px-4 flex flex-wrap justify-center gap-4 mt-[50px]">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-purple-600' : 'bg-gray-700'}`}
        >
          Бүгд
        </button>
        <button 
          onClick={() => setFilter('Esports төв')}
          className={`px-4 py-2 rounded-lg ${filter === 'Esports төв' ? 'bg-purple-600' : 'bg-gray-700'}`}
        >
          Esports төв
        </button>
      </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px]">
          {(filteredVendors?.length ? filteredVendors : vendors)?.map(
            (vendor) => (
              <div
              onClick={()=>router.push(`/pc?vendorid=${vendor.id}`)}
                key={vendor.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-600/20 hover:scale-105 relative group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-r from-purple-900/30 to-pink-900/30 relative">
                  <div className="flex items-center justify-center h-full text-purple-300">
                    <div className="text-center">
                      <div className="flex justify-center">
                        <Star size={40} className="opacity-30" />
                      </div>
                      <p className="mt-2 font-medium">{vendor.name}</p>
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
            )
          )}
        </div>


        {filteredVendors?.length === 0 && vendors?.length === 0 && (
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

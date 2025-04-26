/* eslint-disable @next/next/no-img-element */
import { Skeleton } from "@/components/ui/skeleton";
import { useCategory } from "@/provider/categoryProvider";
import { Vendor } from "@/Types/types";
import { Facebook, Gamepad2, Swords } from "lucide-react";
import dynamic from "next/dynamic";
type VendorMapSelectorProps = {
  vendors: Vendor[];
};
const VendorMap = dynamic<VendorMapSelectorProps>(
  () => import("../_components/LocationMap"),
  { ssr: false }
);
const Maincontent = () => {
  const { category } = useCategory();
  const isLoading = !category?.name;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white w-screen">
      <header className="py-10 px-6 text-center">
        {isLoading ? (
          <Skeleton className="h-14 w-72 mx-auto mb-4" />
        ) : (
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r uppercase from-cyan-400 to-purple-600 drop-shadow-[0_0_15px_rgba(58,150,221,0.5)]">
            {category.name} UNIVERSE
          </h1>
        )}
        <div className="mt-6 h-1 w-32 bg-cyan-500 mx-auto rounded-full shadow-lg" />
      </header>

      <main className="px-6 md:px-12 lg:px-24 py-10 flex-grow">
        <h2 className="text-3xl font-bold text-cyan-300 mb-10 text-center animate-pulse">
          🕹️ Тоглоомын Төрлүүд
        </h2>
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-6 shadow-xl"
                >
                  <Skeleton className="w-full h-48 mb-6 rounded-lg" />
                  <Skeleton className="h-6 w-2/3 mx-auto mb-4" />
                  <Skeleton className="h-4 w-5/6 mx-auto mb-4" />
                  <Skeleton className="h-10 w-32 mx-auto rounded-full" />
                </div>
              ))
            ) : (
              <>
                {category.vendors.map((vendor, i) => (
                  <div key={i} className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-16 w-[500px] shadow-xl hover:shadow-[0_0_20px_#00fff7] transition-shadow duration-300 text-center">
                        <img
                          src={vendor.imageUrl ? vendor.imageUrl : "/game.jpg"}
                          alt="vendor"
                          className="w-full h-48 object-cover rounded-lg mb-6 border border-cyan-500 shadow-md"
                        />
                        <h3 className="text-2xl font-extrabold text-cyan-400 mb-2">
                          {vendor.name}
                        </h3>
                        <p>{vendor.description}</p>
                        <p>{vendor.email}</p>
                        <p>{vendor.phone}</p>
                        <p>{vendor.address?.street}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="overflow-hidden h-[400px] max-w-[4000px] rounded-xl shadow-md mt-[25px]">
            <VendorMap vendors={category?.vendors} />
          </div>

          <footer className="relative bg-gradient-to-r from-[#1f1f3b] via-[#181830] to-[#1f1f3b] border-t border-gray-700 text-gray-400 px-6 py-10 mt-[50px] ">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left */}
              <div>
                <h2 className="text-xl font-bold text-purple-400 mb-3">
                  PC Gaming Universe
                </h2>
                <p className="text-sm text-gray-400">
                  Next-gen gaming experience. Stay competitive, stay cool.
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                  Холбоосууд
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-white">
                      Нүүр
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Тоглоомын төрлүүд
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Тэмцээнүүд
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Холбоо барих
                    </a>
                  </li>
                </ul>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                  Биднийг дагах
                </h3>
                <div className="flex space-x-4">
                  <a href="#">
                    <Gamepad2 className="w-9 h-9" />
                  </a>
                  <a href="#">
                    <Swords className="w-9 h-9" />
                  </a>
                  <a href="#">
                    <Facebook className="w-9 h-9" />
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center text-xs mt-10 text-gray-500">
              © 2025 PC Gaming Universe. All rights reserved.
            </div>
          </footer>
        </section>
      </main>
      
    </div>
  );
};
export default Maincontent;

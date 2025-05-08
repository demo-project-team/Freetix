"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getRoomUser } from "@/utils/request/vendor";
import { useQueryState } from "nuqs";
import { Vendor } from "@/Types/types";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import PcLoadingAnimation from "./pcLoadingAnimation";

export default function HotelPage() {
  const [vendorId] = useQueryState("vendorid");
  const router = useRouter();
  const { data: vendor, isLoading } = useQuery({
    queryKey: ["vendor"],
    queryFn: () => getRoomUser(vendorId),
  });
  console.log(vendor);
  type VendorMapSelectorProps = {
    vendors: Vendor[];
  };
  const VendorMap = dynamic<VendorMapSelectorProps>(
    () => import("../game-see/_components/Location"),
    { ssr: false }
  );
  if (isLoading || !vendor) {
    return <PcLoadingAnimation />;
  }
  return (
    <div>
      <div className="p-6 max-w-6xl mx-auto space-y-6 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{vendor.name}</h1>
        </div>

        <div className="flex items-center text-black-600">
          <MapPin className="mr-2" />
          {vendor.address?.street}
          {vendor.address?.SumOrKhoroo}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Image
              src={
                vendor.imageUrl
                  ? vendor.imageUrl
                  : "https://fl-1.cdn.flockler.com/embed/no-image.svg"
              } // Зураг public фолдерт хадгалагдсан байх
              alt="Pc"
              width={800}
              height={500}
              className="rounded-lg shadow"
            />
            <div className="flex space-x-2 mt-4">
              {Array.from({ length: 4 }).map((src, i) => (
                <Image
                  key={i}
                  src={
                    vendor.imageUrl
                      ? vendor.imageUrl
                      : "https://fl-1.cdn.flockler.com/embed/no-image.svg"
                  }
                  alt="thumb"
                  width={100}
                  height={70}
                  className="rounded"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center"></div>
            <div className="relative h-150">
              <VendorMap vendors={[vendor]} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ">
          {vendor.rooms
            .filter((room) => room.type === "VIP")
            .map((room) => (
              <div
                key={room.id}
                className="cursor-pointer bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 p-6 rounded-xl shadow transition"
                onClick={() => router.push(`room?roomid=${room.id}`)}
              >
                <h2 className="text-2xl font-bold text-yellow-700 mb-2">
                  💎 VIP Өрөө
                </h2>
                <p className="text-gray-700">
                  Илүү тав тух, өндөр үзүүлэлттэй төхөөрөмж, хувийн орон зай.
                </p>

                <div className="mt-4 text-green-600 font-semibold">
                  {room.pcPricePerHour}
                </div>
              </div>
            ))}

          {vendor.rooms
            .filter((room) => room.type === "STANDART")
            .map((room) => (
              <div
                key={room.id}
                onClick={() => router.push(`room?roomid=${room.id}`)}
                className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-300 p-6 rounded-xl shadow transition"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  💻 Стандарт Өрөө
                </h2>
                <p className="text-gray-700">
                  Стандарт төхөөрөмжтэй, өдөр тутмын тоглоход тохиромжтой өрөө.
                </p>
                <div className="mt-4 text-green-600 font-semibold">
                  {room.pcPricePerHour}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

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

export default function HotelPage() {
  const [vendorId] = useQueryState("vendorid");
  const router = useRouter();
  const { data: vendor } = useQuery({
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
  if (!vendor) {
    return;
  }
  return (
    <div>
      <div className="p-6 max-w-6xl mx-auto space-y-6 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{vendor.name}</h1>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="mr-2" />
          Улаанбаатар хот, Баянгол дүүрэг 4-р хороо, Жасрайны гудамж, #27а
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
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-md text-sm font-semibold">
              Баталгаажих хугацаа: 30 минут
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">
                5000₮ <span className="text-gray-600 text-sm">/ цаг</span>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow">
                Захиалах
              </button>
            </div>
            <div className="relative h-64">
              <VendorMap vendors={[vendor]} />
            </div>
            <div className="bg-blue-100 text-blue-700 p-4 rounded-md text-center text-lg font-bold">
              Нийт захиалсан тоо: 69
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ">
          <div
            onClick={() => {
              const vipRoom = vendor.rooms.find((room) => room.type === "VIP");
              if (vipRoom) router.push(`/room?roomid=${vipRoom.id}`);
            }}
            className="cursor-pointer bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 p-6 rounded-xl shadow transition"
          >
            <h2 className="text-2xl font-bold text-yellow-700 mb-2">
              💎 VIP Өрөө
            </h2>
            <p className="text-gray-700">
              Илүү тав тух, өндөр үзүүлэлттэй төхөөрөмж, хувийн орон зай.
            </p>
            <div className="mt-4 text-green-600 font-semibold">8000₮ / цаг</div>
          </div>

          <div
            onClick={() => {
              const stdRoom = vendor.rooms.find(
                (room) => room.type === "STANDART"
              );
              if (stdRoom) router.push(`/room?roomid=${stdRoom.id}`);
            }}
            className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-300 p-6 rounded-xl shadow transition"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              💻 Стандарт Өрөө
            </h2>
            <p className="text-gray-700">
              Стандарт төхөөрөмжтэй, өдөр тутмын тоглоход тохиромжтой өрөө.
            </p>
            <div className="mt-4 text-green-600 font-semibold">5000₮ / цаг</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

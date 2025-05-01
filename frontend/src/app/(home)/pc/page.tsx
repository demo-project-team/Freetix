"use client";
 
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getRoomUser } from "@/utils/request/vendor";
import { useQueryState } from "nuqs";
import { Vendor } from "@/Types/types";
import dynamic from "next/dynamic";
 
export default function HotelPage() {
  const [vendorId] = useQueryState('vendorid')
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn") || "2025-05-01";
  const checkOut = searchParams.get("checkOut") || "2025-05-02";
 const {data : vendor} = useQuery({
    queryKey : ['vendor'],
    queryFn : ()=>getRoomUser(vendorId)
 })
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
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Наранбулаг зочид буудал | Naranbulag hotel
        </h1>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md font-medium">
          {checkIn} - {checkOut}
        </div>
      </div>
 
      <div className="flex items-center text-gray-600">
        <MapPin className="mr-2" />
        Улаанбаатар хот, Баянгол дүүрэг 4-р хороо, Жасрайны гудамж, #27а
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Image
            src="/hotel-main.jpg" // Зураг public фолдерт хадгалагдсан байх
            alt="Naranbulag hotel"
            width={800}
            height={500}
            className="rounded-lg shadow"
          />
          <div className="flex space-x-2 mt-4">
            {["/hotel1.jpg", "/hotel2.jpg", "/hotel3.jpg", "/hotel4.jpg"].map(
              (src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="thumb"
                  width={100}
                  height={70}
                  className="rounded"
                />
              )
            )}
          </div>
        </div>
 
        <div className="space-y-4">
          <div className="bg-yellow-100 text-yellow-700 p-3 rounded-md text-sm font-semibold">
            Баталгаажих хугацаа: 1-3 цаг
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">
              300,000₮ <span className="text-gray-600 text-sm">/ хоног</span>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow">
              Захиалах
            </button>
          </div>
 
       <VendorMap vendors={[vendor]}/>
 
          <div className="bg-blue-100 text-blue-700 p-4 rounded-md text-center text-lg font-bold">
            Нийт захиалсан тоо: 22
          </div>
        </div>
      </div>
    </div>
  );
}
 
 
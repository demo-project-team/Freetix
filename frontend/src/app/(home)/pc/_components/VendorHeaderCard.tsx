"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, ClockAlert, ChevronLeft } from "lucide-react";
import { Vendor } from "@/Types/types";
import TakeTime from "./TakeTime";

type Props = {
  vendor: Vendor;
};

export default function VendorHeaderCard({ vendor }: Props) {
  const router = useRouter();

  return (
    <div className="relative w-full h-64 md:h-96 rounded-sm overflow-hidden">
      {/* Cover Image */}
      <Image
        src={vendor.imageUrl || "/default-cover.jpg"}
        alt="Cover"
        fill
        className="object-cover absolute inset-0"
      />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex gap-1.5 absolute top-4 left-4 bg-white/5 text-white text-sm rounded-sm px-4 py-2 shadow hover:shadow hover:bg-gradient-to-tl to-blue-950 transition"
      >
        <ChevronLeft className="w-3.5 h-5 stroke-[2.5]" />
        Буцах
      </button>

      {/* Favorite Button */}
      {/* <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition hover:shadow hover:bg-gradient-to-tl to-blue-950">
        <Heart className="w-5 h-5 stroke-[2.5] hover:text-pink-700" />
      </button> */}

      {/* Bottom Card */}
      <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-sm p-4 md:p-6 flex items-center gap-4 shadow-inner">
        {/* Profile Picture */}
        <Image
          src={vendor.imageUrl || "/next.svg"}
          alt="Profile"
          width={120}
          height={120}
          className="rounded object-cover"
        />

        {/* Info */}
        <div className="flex-1">
          <h6 className="text-xl md:text-lg font-semibold  text-black">
            {vendor.name}
          </h6>
          <div>
            <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
              <MapPin className="w-4 h-4 stroke-[1.5] align-baseline" />{" "}
              <span>
                {vendor.address?.street} {vendor.address?.SumOrKhoroo}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <ClockAlert className="text-green-600 w-3.5 h-3.5 stroke-[1.5] align-baseline" />{" "}
              <span className="text-green-600 text-sm">Нээлттэй</span>
            </div>
          </div>
        </div>
        <div>
        <TakeTime vendor={vendor}/>
        </div>
      </div>
    </div>
  );
}

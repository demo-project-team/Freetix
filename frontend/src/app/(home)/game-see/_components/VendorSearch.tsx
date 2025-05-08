"use client";

import SearchInput from "@/app/(home)/game-see/_components/SearchInput";
import { Vendor } from "@/Types/types";
import { useState } from "react";
import { Dot, MapPin, Phone } from "lucide-react";

export default function VendorList({ vendors }: { vendors: Vendor[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm) ||
      vendor.address?.street?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Газар, нэр, утас хайх..."
      />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 w-[705px]">
        {filtered.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white text-black rounded shadow flex items-center gap-4 h-auto w-full"
          >
            <img
              src={vendor.imageUrl || "/default-image.jpg"}
              alt={vendor.name || "Vendor image"}
              className="w-24 h-24 object-cover rounded mb-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{vendor.name}</h2>
              <div className="flex">
                <p className="text-sm flex items-center gap-1">
                  <Phone className="w-4 h-4 stroke-[1.5] align-baseline" />{" "}
                  {vendor.phone}{" "}
                </p>
                <Dot className="w-6 h-6 text-black" />
                <p className="text-sm flex items-center gap-1">
                  <MapPin className="w-4 h-4 stroke-[1.5] align-baseline" />{" "}
                  {vendor.address?.street || "Хаяг байхгүй"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

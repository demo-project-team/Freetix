"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SearchInput from "@/app/(home)/game-see/_components/SearchInput";
import { Vendor } from "@/Types/types";
import { Map, Phone } from "lucide-react";

export default function VendorSearch({ vendors }: { vendors: Vendor[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    || vendor.address?.street?.toLowerCase().includes(searchTerm.toLowerCase())
    || vendor.phone?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Газар хайх..."
      />

      {searchTerm && filteredVendors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="bg-muted/60 transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedVendor(vendor)}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={vendor.imageUrl || "/next.svg"} />
                  <AvatarFallback>{vendor.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-base font-semibold">
                  {vendor.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Map size={16} className="text-purple-400" />
                  {vendor.address?.street || "Хаяг байхгүй"}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-purple-400" />
                  {vendor.phone || "Утасны дугаар байхгүй"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchTerm && filteredVendors.length === 0 && (
        <div className="text-center text-sm text-gray-400 mt-10">
          Хайлтад тохирох газар олдсонгүй.
        </div>
      )}

      {/* Dialog for Vendor Detail */}
      {selectedVendor && (
        <Dialog open={true} onOpenChange={() => setSelectedVendor(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedVendor.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src={selectedVendor.imageUrl || "/next.svg"} />
                <AvatarFallback>
                  {selectedVendor.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <p className="flex items-center gap-2 text-sm">
                <Map size={18} className="text-purple-400" />
                {selectedVendor.address?.street || "Хаяг байхгүй"}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Phone size={18} className="text-purple-400" />
                {selectedVendor.phone || "Утасны дугаар байхгүй"}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

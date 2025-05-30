/* eslint-disable @next/next/no-img-element */

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Vendor } from "@/Types/types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function VendorMap({ vendors }: { vendors: Vendor[] }) {
  const router = useRouter()
  if (!vendors) {
    return <Skeleton className="w-full h-full" />;
  }
  return (
    <MapContainer
      center={[47.9188, 106.9177]}
      zoom={13}
      className="rounded-lg flex z-10 "
      style={{ height: '400px', width: "500px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {vendors
        .filter((vendor) => vendor.mapLat !== null && vendor.mapLng !== null)
        .map((vendor, i) => {
          const lat = vendor.mapLat as number;
          const lng = vendor.mapLng as number;
          if (!lat || !lng) {
            return;
          }
          return (
            <Marker key={i} position={[lat, lng]}>
              <Popup>
                <div onClick={()=> router.push(`pc?vendorid=${vendor.id}`)}>
                  <img src={vendor.imageUrl ? vendor.imageUrl : 'next.svg'} alt="img"/>
                  {vendor.name}</div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}

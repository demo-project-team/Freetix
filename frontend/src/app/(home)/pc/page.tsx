"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getRoomUser } from "@/utils/request/vendor";
import { useQueryState } from "nuqs";
// import { Vendor } from "@/Types/types";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
// import PcLoadingAnimation from "./pcLoadingAnimation";
import { useState, useEffect } from "react";
import Head from "next/head";
import VendorHeaderCard from "@/app/(home)/pc/_components/VendorHeaderCard";
import LoadingScreen from "@/components/LoadingScreen";
import Images from "./_components/Images";

export default function HotelPage() {
  const [vendorId] = useQueryState("vendorid");
  const router = useRouter();

  useEffect(() => {
    if (!vendorId) {
      router.push("/");
    }
  }, [vendorId, router]);

  const { data: vendor, isLoading } = useQuery({
    queryKey: ["vendor", vendorId],
    queryFn: () => getRoomUser(vendorId),
    enabled: !!vendorId,
  });
  console.log(vendor);

  const VendorMap = dynamic(() => import("../game-see/_components/Location"), {
    ssr: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageIndex, setImageIndex] = useState(0);

  const images =
    vendor?.images?.length && Array.isArray(vendor.images)
      ? vendor.images
      : [
          vendor?.imageUrl ||
            "https://fl-1.cdn.flockler.com/embed/no-image.svg",
        ];

  // const handlePrev = () => {
  //   setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // };

  // const handleNext = () => {
  //   setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setImageIndex((prev) => (prev + 1) % images.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [images.length]);

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") setLightboxOpen(false);
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

  if (isLoading || !vendor) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Head>
        <title>{vendor.name} - Gaming Center</title>
        <meta name="description" content={`Explore rooms at ${vendor.name}`} />
      </Head>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{vendor.name}</h1>
        </div>
        <div className="flex items-center text-black-600">
          <MapPin className="mr-2" aria-label="location icon" />
          {vendor.address?.street} {vendor.address?.district.name}-дүүрэг {vendor.address?.SumOrKhoroo}-хороо
        </div>
        <div>
          <VendorHeaderCard vendor={vendor} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative w-full max-w-xl flex">
            {images.length !== 0 ? (
                 <Images images={vendor.images}/>
            ): <div>зураг оруулаагүй байна</div>}
          </div>

          <div className="space-y-4 flex flex-col items-end">
            <div className="relative h-[400px]">
              <VendorMap vendors={[vendor]} />
            </div>
            
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
            ))} */}

          {/* {vendor.rooms
            .filter((room) => room.type === "VVIP")
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
            ))} */}
        {/* </div> */}

        {/* <Review vendor={vendor} /> */}
      </div>

      <Footer />

      {/* Lightbox fullscreen view */}
      {/* {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-7xl flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white z-50"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white z-50"
              aria-label="Previous image"
            >
              <ChevronLeft size={48} />
            </button>
            <Image
              src={images[imageIndex]}
              alt={`Full screen view of ${vendor.name} image ${imageIndex + 1}`}
              width={1000}
              height={700}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white z-50"
              aria-label="Next image"
            >
              <ChevronRight size={48} />
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

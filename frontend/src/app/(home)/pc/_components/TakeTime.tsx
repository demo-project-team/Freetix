"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vendor } from "@/Types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TakeTime = ({ vendor }: { vendor: Vendor }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
          <button className="bg-black text-white text-sm px-18 py-2.5 rounded hover:bg-gradient-to-tl to-blue-950 font-semibold">
            Цаг авах
          </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{vendor.name} - Өрөө сонгох</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="VIP" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <TabsTrigger value="VVIP">VVIP</TabsTrigger>
            <TabsTrigger value="VIP">VIP</TabsTrigger>
            <TabsTrigger value="LOBBY">Lobby</TabsTrigger>
            <TabsTrigger value="FPS">FPS</TabsTrigger>
            <TabsTrigger value="STREAMER">Streamer</TabsTrigger>
            <TabsTrigger value="STAGE">Stage</TabsTrigger>
          </TabsList>

          {["VVIP", "VIP", "LOBBY", "FPS", "STREAMER", "STAGE"].map((type) => (
            <TabsContent key={type} value={type}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {vendor.rooms.filter((room)=>room.type === type).length === 0 && <div className="p-6">Өрөө оруулаагүй байна</div>}
                {vendor.rooms
                  .filter((room) => room.type === type)
                  .map((room) => (
                    <div
                      key={room.id}
                      className="cursor-pointer bg-gray-500 hover:bg-gray-100 border border-gray-300 p-6 rounded-xl shadow transition"
                      onClick={() => router.push(`room?roomid=${room.id}`)}
                    >
                      <h2 className="text-xl text-green-600 flex items-center justify-center mb-2">Цагийн үнэ: {room.pcPricePerHour}</h2>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default TakeTime;

"use client";

import { useRoom } from "@/provider/RoomProvider";
import { AddRoom } from "./_features/AddRoom";
import { useRouter } from "next/navigation";
import SkeletonLoader from "./_features/Loading";
import { Skeleton } from "@/components/ui/skeleton";
// import ChatComp from "./_features/AcceptCall";
// import CallComp from "./_features/AcceptCall";
// import { AcceptUserCall } from "./_features/AcceptCall";

export default function PCLayout() {
  const { room, isLoading } = useRoom();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3">
      <AddRoom />
      <div>
        <div>Standart</div>
        {!isLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {room
              .filter((rm) => rm.type !== "VIP")
              .map((rm, i) => (
                <div
                  key={i}
                  className="border rounded-lg flex items-center justify-center h-40"
                  onClick={() => router.push(`/vendor/room?roomid=${rm.id}`)}
                >
                  {rm.name}
                </div>
              ))}
          </div>
        ) : (
          <SkeletonLoader />
        )}
      </div>
      <div>
        <div className="text-yellow-400 shadow-yellow-500/50 p-6 rounded-2xl">
          VIP
        </div>
        {!isLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {room
              .filter((rm) => rm.type === "VIP")
              .map((rm, i) => (
                <div
                  onClick={() => router.push(`/vendor/room?roomid=${rm.id}`)}
                  key={i}
                  className="border-2 border-yellow-400 rounded-xl flex items-center justify-center h-40 text-yellow-300 shadow-lg shadow-yellow-500/30"
                >
                  {rm.name}
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-40 border-yellow-400 border" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRoom } from "@/provider/RoomProvider";
import { AddRoom } from "./_features/AddRoom";
import { useRouter } from "next/navigation";
import SkeletonLoader from "./_features/Loading";
// import ChatComp from "./_features/AcceptCall";
// import CallComp from "./_features/AcceptCall";
// import { AcceptUserCall } from "./_features/AcceptCall";
const types = ["LOBBY", "VIP", "VVIP", "STREAMER", "STAGE", "FPS"];
export default function PCLayout() {
  const { room, isLoading } = useRoom();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3">
      <AddRoom />
      {types.map((type) => (
        <div key={type}>
          {!isLoading ? (
            <div>
              <div>{type}</div>
              <div className="grid grid-cols-4 gap-4">
                {room
                  .filter((r) => r.type === type)
                  .map((r) => (
                    <div
                      key={r.id}
                      className="border rounded-lg flex items-center justify-center h-40"
                      onClick={() => router.push(`/vendor/room?roomid=${r.id}`)}
                    >
                      {r.name}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <SkeletonLoader />
          )}
        </div>
      ))}
    </div>
  );
}

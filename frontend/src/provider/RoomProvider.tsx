"use client";

import {  Room } from "@/Types/types";
import { getRoom } from "@/utils/request/vendor";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
type RoomContextType = {
  room: Room[];
  refetchRoom: () => void;
  isLoading : boolean
};

const RoomContex = createContext<RoomContextType | null>(null);
export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const { data: room=[], refetch:refetchRoom, isLoading} = useQuery({
    queryKey: ["room"],
    queryFn : getRoom
  });

  return (
    <RoomContex.Provider value={{ room, refetchRoom , isLoading}}>
      {children}
    </RoomContex.Provider>
  );
};
export const useRoom = () => {
  const context = useContext(RoomContex);
  if (!context) {
    throw new Error("useUser must be used within a RoomProvider");
  }
  return context;
};

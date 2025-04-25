"use client";
import {  Room } from "@/Types/types";
import { getRoom } from "@/utils/request/vendor";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
type RoomContextType = {
  room: Room;
  refetch: () => void;
};

const RoomContex = createContext<RoomContextType | null>(null);
export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const { data: room, refetch } = useQuery({
    queryKey: ["room"],
    queryFn : getRoom
  });
  return (
    <RoomContex.Provider value={{ room, refetch }}>
      {children}
    </RoomContex.Provider>
  );
};
export const useOrganization = () => {
  const context = useContext(RoomContex);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

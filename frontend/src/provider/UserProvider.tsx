"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserPublicProfile } from "@/utils/request/authRequest";
import { Booking } from "@/Types/types";
type UserContextType = {
  user: User | null;
  refetchUser : () => void,
  open : boolean,
  setOpen : (open : boolean) => void
};
type User = { id: string; name: string; email?: string, bookings: Booking } ;
const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen ] = useState(false)
const {data : user, refetch : refetchUser} = useQuery({
    queryKey : ['user'],
    queryFn : getUserPublicProfile
})
  return (
    <UserContext.Provider value={{ user, refetchUser, open, setOpen }}>{children}</UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

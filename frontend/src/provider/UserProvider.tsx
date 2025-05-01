"use client";
import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserPublicProfile } from "@/utils/request/authRequest";
type UserContextType = {
  user: User | null;
  refetchUser : () => void
};
type User = { id: string; name: string; email?: string };
const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
const {data : user, refetch : refetchUser} = useQuery({
    queryKey : ['user'],
    queryFn : getUserPublicProfile
})
  return (
    <UserContext.Provider value={{ user, refetchUser }}>{children}</UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

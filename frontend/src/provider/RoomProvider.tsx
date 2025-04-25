'use client'
import { Organization } from "@/Types/types";
import { getOrg } from "@/utils/request/authRequest";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
type RoomContextType = {
  organization: Organization[];
  refetchorganization: () => void;
};

const RoomContex = createContext<RoomContextType | null>(null);
export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const { data: organization, refetch: refetchorganization } = useQuery({
    queryKey: ["organization"],
    queryFn: getOrg,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <RoomContex.Provider value={{ organization, refetchorganization }}>
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

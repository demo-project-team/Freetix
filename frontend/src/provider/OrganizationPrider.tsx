'use client'
import { Organization } from "@/Types/types";
import { getOrg } from "@/utils/request/authRequest";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
type OrgContextType = {
  organization: Organization[];
  refetchorganization: () => void;
};

const OrgContext = createContext<OrgContextType | null>(null);
export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const { data: organization, refetch: refetchorganization } = useQuery({
    queryKey: ["organization"],
    queryFn: getOrg,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <OrgContext.Provider value={{ organization, refetchorganization }}>
      {children}
    </OrgContext.Provider>
  );
};
export const useOrganization = () => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error("useUser must be used within a OrganizationProvider");
  }
  return context;
};

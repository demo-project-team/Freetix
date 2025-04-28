'use client'

import { Vendor } from "@/Types/types";
import { getVendor } from "@/utils/request/vendor";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext} from "react";
type VendorContextType = {
  vendors: Vendor[];
  refetchvendor: () => void;
  isError : boolean,
  isLoading : boolean
};

const VendorContext = createContext<VendorContextType | null>(null);
export const VendorProviderUser = ({ children}: { children: ReactNode }) => {
  const { data: vendors, refetch: refetchvendor, isLoading, isError } = useQuery({
    queryKey: ["vendor"],
    queryFn: getVendor,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <VendorContext.Provider value={{ vendors, refetchvendor, isError, isLoading}}>
      {children}
    </VendorContext.Provider>
  );
};
export const useUserVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

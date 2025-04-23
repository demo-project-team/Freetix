'use client'

import { Vendor } from "@/Types/types";
import { vendorByOwner } from "@/utils/request/vendor";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect } from "react";
type VendorContextType = {
  vendor: Vendor;
  refetchvendor: () => void;
  isError : boolean,
  isLoading : boolean
};

const VendorContext = createContext<VendorContextType | null>(null);
export const VendorProvider = ({ children, id }: { children: ReactNode, id:string }) => {
    const router = useRouter()
  const { data: vendor, refetch: refetchvendor, isLoading, isError } = useQuery({
    queryKey: ["vendor", id],
    queryFn: ()=>vendorByOwner(id),
    staleTime: 1000 * 60 * 5,
  });
  useEffect(()=>{
    if (!isLoading && !vendor && !isError) {
        router.push(`/organization/createvendor?orgId=${id}`)
    }
  },[isLoading, vendor, router, id, isError])
  return (
    <VendorContext.Provider value={{ vendor, refetchvendor, isError, isLoading}}>
      {children}
    </VendorContext.Provider>
  );
};
export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

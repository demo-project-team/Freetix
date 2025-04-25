import VendroSidbar from "@/components/VendorSideBar";
import { OrganizationProvider } from "@/provider/OrganizationPrider";
import { VendorProvider } from "@/provider/VendorProvider";
import { ReactNode } from "react";

const HomeLoayout = ({ children }: { children: ReactNode }) => {
  return (
    <OrganizationProvider>
        <VendorProvider>
      <div className="flex">
        <VendroSidbar/>
        <main className="flex-1 p-4">{children}</main>
      </div>
        </VendorProvider>
    </OrganizationProvider>
  );
};
export default HomeLoayout;

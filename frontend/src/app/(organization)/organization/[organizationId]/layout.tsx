import VendroSidbar from "@/components/VendorSideBar";
import { OrganizationProvider } from "@/provider/OrganizationPrider";
import { ReactNode } from "react";

const HomeLoayout = ({ children }: { children: ReactNode }) => {
  return (
    <OrganizationProvider>
      <div className="flex">
        <VendroSidbar/>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </OrganizationProvider>
  );
};
export default HomeLoayout;

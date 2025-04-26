import VendroSidbar from "@/components/VendorSideBar";
import { OrganizationProvider } from "@/provider/OrganizationPrider";
import { RoomProvider } from "@/provider/RoomProvider";
import { TableProvider } from "@/provider/TableProvider";
import { VendorProvider } from "@/provider/VendorProvider";
import { ReactNode } from "react";

const HomeLoayout = ({ children }: { children: ReactNode }) => {
  return (
    <OrganizationProvider>
      <VendorProvider>
        <RoomProvider>
          <TableProvider>
            <div className="flex">
              <VendroSidbar />
              <main className="flex-1 p-4">{children}</main>
            </div>
          </TableProvider>
        </RoomProvider>
      </VendorProvider>
    </OrganizationProvider>
  );
};
export default HomeLoayout;

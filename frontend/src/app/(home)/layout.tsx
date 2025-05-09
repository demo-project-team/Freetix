import Header from "@/components/Header";
import { SocketProvider } from "@/provider/SocketProvider";
import { TableProvider } from "@/provider/TableProvider";
import { UserProvider } from "@/provider/UserProvider";
import { VendorProviderUser } from "@/provider/VendorProvderUser";
import { ReactNode } from "react";

export default function HomeLoayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <TableProvider>
        <VendorProviderUser>
          <SocketProvider>
            <div className="flex flex-col min-h-screen  bg-gradient-to-b from-indigo-900 via-purple-800   text-blue-400 to-indigo-500 ">
              <Header />
              {children}
            </div>
          </SocketProvider>
        </VendorProviderUser>
      </TableProvider>
    </UserProvider>
  );
}

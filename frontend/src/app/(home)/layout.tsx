import Header from "@/components/Header";
import { SocketProvider } from "@/provider/SocketProvider";
import { TableProvider } from "@/provider/TableProvider";
import { UserProvider } from "@/provider/UserProvider";
import { VendorProviderUser } from "@/provider/VendorProvderUser";
import { ReactNode } from "react";
import OptimizedParticlesEffect from "@/components/ParticlesBackground";

export default function HomeLoayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <TableProvider>
        <VendorProviderUser>
          <SocketProvider>
            <Header />
            <div className="relative min-h-screen text-white">
              <OptimizedParticlesEffect className="fixed inset-0 z-[-10]" />
              {children}
            </div>
          </SocketProvider>
        </VendorProviderUser>
      </TableProvider>
    </UserProvider>
  );
}

import { ReactNode } from "react";
import Header from "@/components/Header";
import { TableProvider } from "@/provider/TableProvider";

const HomeLoayout = ({ children }: { children: ReactNode }) => {
  return (
    <TableProvider>
      <div className="flex flex-col min-h-screen w-screen bg-white">
        <Header />
        {children}
      </div>
    </TableProvider>
  );
};
export default HomeLoayout;

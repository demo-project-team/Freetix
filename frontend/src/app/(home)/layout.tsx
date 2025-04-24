import { ReactNode } from "react";
import Header from "@/components/Header";

const HomeLoayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
     <Header/>
      {children}
    </div>
  );
};
export default HomeLoayout;

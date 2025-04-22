import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

import { User } from "lucide-react";
import SideBar from "@/components/SidebarComp";

const HomeLoayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-screen bg-gray-950">
     <SideBar/>
      {children}
      <div className="fixed bottom-6 right-6">
        <Button className="w-12 h-12 rounded-full bg-gray-900 border border-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-500/30 p-0">
          <User size={20} />
        </Button>
      </div>
    </div>
  );
};
export default HomeLoayout;

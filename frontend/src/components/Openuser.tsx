import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Sign } from "./Sign";
import { Loginup } from "./Login";

export const OpenUser = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <User2 />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="p-6">
              <div className="flex items-center">
                <span className="text-orange-500 font-bold text-xl">G-</span>
                <span className="text-white font-bold text-xl">Freetix</span>
                <span className="text-white ml-2">Welcome to Freetix</span>
              </div>
              <div className="mt-8 border-b border-gray-600">
                <div className="flex gap-10">
                  <Tabs defaultValue="account">
                    <TabsList className="w-[420px]">
                      <TabsTrigger
                        value="НЭВТРЭХ"
                        className="pb-1 px-1 text-orange-500 border-b-2  flex items-center"
                      >
                        НЭВТРЭХ
                      </TabsTrigger>
                      <TabsTrigger
                        value="БҮРТГҮҮЛЭХ"
                        className="pb-1 px-1 text-gray-400 flex items-center "
                      >
                        БҮРТГҮҮЛЭХ
                      </TabsTrigger>
                    </TabsList>
                    <Loginup />
                    <Sign />
                  </Tabs>
                </div>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

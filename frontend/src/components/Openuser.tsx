import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPinHouse, User2, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Sign } from "./Sign";
import { Loginup } from "./Login";
import Link from "next/link";
import { useState } from "react";

export const OpenUser = () => {
  const [open, Setopen] = useState(false);
  const HandleClose = () => {
    Setopen(false);
  };
  return (
    <Dialog open={open} onOpenChange={Setopen}>
      <DialogTrigger className="flex items-center justify-center">
        <User2 />
        Login
      </DialogTrigger>
      <DialogContent>
        <X onClick={HandleClose} />
        <DialogHeader>
          <DialogTitle>
            <div className="p-6">
              <div className="flex items-center">
                <p>logohere</p>
                <span className="text-white font-bold text-xl">Е-СЛОТД</span>
                <span className="text-white font-bold text-xl">.</span>
                <span className="text-white ml-2 ">Тавтай Морилно уу.</span>
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
        <Link href={"/sign-up"}>
          <div className="flex items-center gap-3 px-6 cursor-pointer hover:underline">
            <MapPinHouse /> ГАЗАР БҮРТГҮҮЛЭХ
          </div>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  User2, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Sign } from "./Sign";
import { Loginup } from "./Login";
import { useUser } from "@/provider/UserProvider";

export const OpenUser = () => {
  const {open, setOpen} = useUser()
  const HandleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center justify-center text-black gap-0.5 rounded-sm bg-white cursor-pointer py-0.5 px-2 font-medium hover:opacity-60 transition-all duration-300">
        <User2 className="" width={14} />
        Login
      </DialogTrigger>
      <DialogContent className="w-full">
        <X onClick={HandleClose} />
        <DialogHeader>
          <DialogTitle>
            <div className="p-6 w-full">
              <div className="flex items-center justify-center">
                 <img src="eslot-logo.png" alt="" className="w-[125px] h-[25px]" />
                <span className="text-white ml-2 ">Тавтай Морилно уу.</span>
              </div>
              <div className="mt-8 border-b w-full border-gray-600">
                <div className="flex w-full gap-10">
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="w-full">
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

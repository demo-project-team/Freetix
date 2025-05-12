"use client";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import {  X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import LoginForm from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

export const SignUp = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center justify-center text-gray-400 hover:text-white transition duration-300 gap-0.5 rounded-sm py-0.5 px-2 font-medium  hover:bg-white/10 transition cursor-pointer">
        Register Your Business
      </DialogTrigger>
      <DialogContent>
        <X onClick={handleClose} />
        <DialogHeader>
          <DialogTitle>
            <div className="p-6">
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
                    <LoginForm />
                    <SignUpForm />
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

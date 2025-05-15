import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {  LoginAdmin } from "./_components/login";
import { useState } from "react";
import { X } from "lucide-react";

export default function AdminLogin() {
     const [open, setOpen] = useState(false);
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-4 sm:p-6">
        <X
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white"
        />

        <DialogHeader>
          <DialogTitle>
            <div className="border-b border-gray-600">
              <div className="flex flex-col gap-6">
                <Tabs defaultValue="НЭВТРЭХ" className="w-full">
                  <TabsList className="flex flex-col sm:flex-row sm:justify-start gap-2 sm:gap-4 w-full">
                    <TabsTrigger
                      value="НЭВТРЭХ"
                      className="pb-1 px-1 text-orange-500 border-b-2 border-orange-500 sm:border-none flex items-center"
                    >
                      НЭВТРЭХ
                    </TabsTrigger>
                    <TabsTrigger
                      value="БҮРТГҮҮЛЭХ"
                      className="pb-1 px-1 text-gray-400 flex items-center sm:border-none"
                    >
                      БҮРТГҮҮЛЭХ
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4">
                    <TabsContent value="НЭВТРЭХ">
                      <LoginAdmin />
                    </TabsContent>
                    <TabsContent value="БҮРТГҮҮЛЭХ">
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

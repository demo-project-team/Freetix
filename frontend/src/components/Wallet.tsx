"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  Wallet2, X } from "lucide-react";
export const Tolbor = () => {
  const [open, Setopen] = useState(false);
  const HandleClose = () => {
    Setopen(false);
  };

  return (
    <Dialog open={open} onOpenChange={Setopen}>
      <DialogTrigger className="flex items-center justify-center">
        <Wallet2 />
        Хэтэвч
      </DialogTrigger>
      <DialogContent>
        <X onClick={HandleClose} />
        <DialogHeader>
          <DialogTitle>
            <Card className="w-full max-w-md mt-4 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">💰 Хэтэвч</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Үлдэгдэл:</span>
                  <span className="text-xl font-bold text-green-600">
                    9000₮
                  </span>
                </div>

                
                  <div className="text-center mb-4">

                    <p className="text-sm text-muted-foreground mt-2">
                      QPay ашиглан скан хийнэ үү
                    </p>
                  </div>
              </CardContent>
            </Card>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

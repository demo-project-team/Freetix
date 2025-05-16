"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

const Reminder = ({
  onClick,
  loading,
  isOpen,
  setIsOpen,
}: {
  onClick: () => void;
  loading: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setIsOpen(true)}>
          {loading ? "Processing..." : "Захиалга хийх"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Захиалга хийхээс өмнө
            </h2>
          </div>
          <DialogDescription className="text-gray-600">
            Баталгаажсаны дараа цуцлах боломжгүйг анхаарна уу.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Button onClick={()=>setIsOpen(false)} className="w-1/3">цуцлах</Button>
          <Button
            disabled={loading}
            onClick={onClick}
            className="w-2/3 bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Захиалга хийх"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Reminder;

"use client";

import { useTable } from "@/provider/TableProvider";
import { ComputerPc } from "./_components/ComputerPc";
import { useState } from "react";
import PcLoadingAnimation from "../pc/_components/pcLoadingAnimation";
import { getUnavailablePc, putPc } from "@/utils/request/pcRequest";
import { Button } from "@/components/ui/button";
import { Time } from "@/Types/types";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import GlowGlassCard from "@/components/TopGlowCard";
import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateTimeOptions } from "@/utils/getTime";
import { useBooking } from "@/provider/BookingProvider";
import { useUser } from "@/provider/UserProvider";
import { Loader, Loader2 } from "lucide-react";

const isTimeBefore = (time1: string, time2: string) => {
  if (!time1 || !time2) return false;
  const [hour1] = time1.split(":").map(Number);
  const [hour2] = time2.split(":").map(Number);
  return hour1 < hour2;
};

export default function Room() {
  const MemoizedComputerPc = memo(ComputerPc);
  const { setOpen } = useUser();
  const { table, isLoading } = useTable();
  const { refetchBooking } = useBooking();
  const [roomId] = useQueryState("roomid");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPcs, setSelectedPcs] = useState<string[]>([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [unavailablePc, setUnavailablePc] = useState<Time[]>();
  const [timeLoad, setTimeLoad] = useState(false);
  const timeOptions = generateTimeOptions();
  const handleStartTimeChange = (newStartTime: string) => {
    setStartTime(newStartTime);
    if (endTime && !isTimeBefore(newStartTime, endTime)) {
      setEndTime("");
    }
  };

  if (isLoading) {
    return <PcLoadingAnimation />;
  }

  const createBooking = async () => {
    if (!roomId || !startTime || !endTime) {
      return;
    }
    const startUTC = new Date(`${date}T${startTime}:00Z`).toISOString();
    const endUTC = new Date(`${date}T${endTime}:00Z`).toISOString();
    setLoading(true);

    try {
      const response = await putPc({
        pcIds: selectedPcs,
        roomId: roomId,
        start: startUTC,
        end: endUTC,
      });
      if (
        response.data &&
        response.response.data.message === "Access denied. No token provided."
      ) {
        console.log(response.response.data);
        setOpen(true);
        setLoading(false);
        return;
      }
      console.log(response);
      
      if (response.pay) {
        router.push(`/payment?payid=${response.pay.id}`);
      }
    } finally {
      await refetchBooking();
      setLoading(false);
    }
  };

  const checkTime = async () => {
    if (!date || !startTime || !endTime) {
      console.log("Date, Start Time, and End Time are required.");
      return;
    }
    setTimeLoad(true);
    const startUTC = new Date(`${date}T${startTime}:00Z`).toISOString();
    const endUTC = new Date(`${date}T${endTime}:00Z`).toISOString();

    try {
      const response = await getUnavailablePc({
        start: startUTC,
        end: endUTC,
      });

      setUnavailablePc(response);
    } catch (error) {
      console.error("Error checking availability:", error);
    } finally {
      setTimeLoad(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="h-40"></div>
      <GlowGlassCard>
        <div className="flex gap-2 lg:flex-row flex-col">
          <div className="flex gap-2 items-center flex-col">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded"
            />

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium">Start</label>
              <Select value={startTime} onValueChange={handleStartTimeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions
                    .filter((time) => {
                      if (date === new Date().toISOString().split("T")[0]) {
                        const currentTime = new Date().toLocaleTimeString(
                          "en-GB",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        );
                        return isTimeBefore(currentTime, time);
                      }
                      return true;
                    })
                    .map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium">End</label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions
                    .filter((time) => {
                      if (date === new Date().toISOString().split("T")[0]) {
                        const currentTime = new Date().toLocaleTimeString(
                          "en-GB",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        );
                        return isTimeBefore(currentTime, time);
                      }
                      return true;
                    })
                    .map((time) => (
                      <SelectItem
                        key={time}
                        value={time}
                        disabled={!isTimeBefore(startTime, time)}
                      >
                        {time}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={checkTime}
              disabled={!date || !startTime || !endTime || loading}
              className="w-full mt-2"
            >
              {timeLoad ? (
                <div className="flex">
                  <Loader2 className="animate-spin" /> Checking...
                </div>
              ) : (
                "Check time"
              )}
            </Button>
            {selectedPcs.length > 0 && (
              <div className="mt-4 p-4 border rounded  flex flex-col gap-4 shadow-lg">
                <h3 className="text-lg font-semibold">Захиалга хийх</h3>
                <div className="flex gap-2">
                  <span>⏰ Эхлэх цаг:</span>
                  <span>{startTime}</span>
                </div>
                <div className="flex gap-2">
                  <span>⏰ Дуусах цаг:</span>
                  <span>{endTime}</span>
                </div>
                <div className="flex gap-2">
                  <span>нийт дүн:</span>
                  <span>
                    {selectedPcs.length *
                      table[0].room.pcPricePerHour *
                      (Number(endTime.slice(0, 2)) -
                        Number(startTime.slice(0, 2)))}
                  </span>
                </div>
                <Button
                  onClick={createBooking}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Processing..." : "Захиалга хийх"}
                </Button>
              </div>
            )}
          </div>

          {unavailablePc ? (
            <div className="grid grid-cols-1 gap-4">
              {table.map((table, index) => (
                <MemoizedComputerPc
                  key={index || table.id}
                  pcs={table.pcs}
                  setSelectedPcs={setSelectedPcs}
                  selectedPcs={selectedPcs}
                  unavailablePcs={unavailablePc}
                />
              ))}
              {timeLoad && (
                <div className="absolute z-10 w-full h-full bg-black/40 flex items-center justify-center">
                  <Loader className="animate-spin mb-30" />
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              цагаа сонгон уу
            </div>
          )}
        </div>
      </GlowGlassCard>
    </div>
  );
}

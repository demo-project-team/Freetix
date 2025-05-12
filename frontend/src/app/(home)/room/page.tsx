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

export default function Room() {
  const { table, isLoading } = useTable();
  const [roomId] = useQueryState("roomid");
  const router = useRouter();
  const [, setLoading] = useState(false);
  const [selectedPcs, setSelectedPcs] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [startTime, setStartsTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [unavailablePc, setUnavailablePc] = useState<Time[]>([]);

  if (isLoading) {
    return <PcLoadingAnimation />;
  }
  const createBooking = async () => {
    if (!roomId) {
      return;
    }
    const startUTC = new Date(`${date}T${startTime}:00Z`).toISOString();
    const endUTC = new Date(`${date}T${endTime}:00Z`).toISOString();
    setLoading(true);
    const response = await putPc({
      pcIds: selectedPcs,
      roomId: roomId,
      start: startUTC,
      end: endUTC,
    });
    console.log(response);

    if (response) {
      router.push(`/payment?payid=${response.pay.id}`);
      setLoading(false);
    }
    setLoading(false);
  };
  const checkTime = async () => {
    if (!date || !startTime || !endTime) {
      console.log("Date, Start Time, and End Time are required.");
      return;
    }
    const startUTC = new Date(`${date}T${startTime}:00Z`).toISOString();
    const endUTC = new Date(`${date}T${endTime}:00Z`).toISOString();
    try {
      const response = await getUnavailablePc({
        start: startUTC,
        end: endUTC,
      });
      console.log(response);

      setUnavailablePc(response);
    } catch (error) {
      console.log(error);
    }
  };
  if (date && endTime) {
    const endUTC = new Date(`${date}T${endTime}:00Z`).toISOString();
    console.log(endUTC);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-3 gap-4">
        {table.map((table, index) => (
          <ComputerPc
            key={index}
            pcs={table.pcs}
            setSelectedPcs={setSelectedPcs}
            selectedPcs={selectedPcs}
            unavailablePcs={unavailablePc}
          />
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <label>Start</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartsTime(e.target.value)}
          className="border p-2 rounded"
        />
        <label>End</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border p-2 rounded"
        />
        <Button onClick={checkTime}>Check time</Button>
      </div>

      {selectedPcs.length > 0 && (
        <div className="mt-4 p-4 border rounded flex flex-col gap-4 shadow-lg">
          <h3 className="text-lg font-semibold">Захиалга хийх</h3>
          <div className="flex flex-col gap-2">
            <div>🖥️ Сонгосон PC-үүд:</div>
            <ul className="list-disc pl-5">
              {selectedPcs.map((pc, index) => (
                <li key={index}></li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <span>⏰ Эхлэх цаг:</span>
            <span>{startTime}</span>
          </div>
          <div className="flex gap-2">
            <span>⏰ Дуусах цаг:</span>
            <span>{endTime}</span>
          </div>
          <Button onClick={createBooking}>Захиалга хийх</Button>
        </div>
      )}
    </div>
  );
}

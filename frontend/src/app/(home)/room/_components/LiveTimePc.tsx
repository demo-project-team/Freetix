"use client";

import { PC, PCStatus } from "@/Types/types";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
export function LiveComputerPc({
  pc,
}: //   selectedPcs,
{
  pc: PC[];
  //   selectedPcs: string[];
}) {
  const [pcs, setPcs] = useState(pc);
  const maxRow = Math.max(...pcs.map((pc) => pc.row), 0);
  const maxCol = Math.max(...pcs.map((pc) => pc.column), 0);
  console.log(pcs);
  
  useEffect(() => {
    const handleStatusUpdate = ({
      pcId,
      status,
    }: {
      pcId: string;
      status: PCStatus;
    }) => {
      setPcs((prev) =>
        prev.map((pc) => (pc.id === pcId ? { ...pc, status } : pc))
      );
    };
    socket.on("pcStatusUpdated", handleStatusUpdate);
    return () => {
      socket.off("pcStatusUpdated", handleStatusUpdate);
    };
  }, []);

  const handleBook = (pc: PC) => {
    if (pc.status === "AVAILABLE") {
      socket.emit("bookPC", { pcId: pc.id , status : "AVAILABLE"});
    } else {
      socket.emit("bookPC", { pcId: pc.id, status: "BOOKED" });
    }
  };
  return (
    <div className="flex flex-col items-center gap-8 p-10">
      {Array.from({ length: maxRow }, (_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-8">
          {Array.from({ length: maxCol }, (_, colIndex) => {
            const pc = pcs.find(
              (pc) => pc.row === rowIndex + 1 && pc.column === colIndex + 1
            );

            return pc ? (
              <div key={colIndex} className="relative group">
                <div
                  onClick={() => handleBook(pc)}
                  className={`w-24 h-24 flex items-center justify-center rounded-2xl shadow-xl text-base font-bold transition-all duration-300 transform group-hover:scale-110 cursor-pointer backdrop-blur-md ${
                    pc.status === "BOOKED"
                      ? "bg-gradient-to-br from-red-400 to-red-500 text-white ring-4 ring-red-500/60"
                      : "bg-gradient-to-br from-green-400 to-green-500 text-white ring-4 ring-green-400/50"
                  }`}
                >
                  {pc.name}
                </div>
              </div>
            ) : (
              <div
                key={colIndex}
                className="w-24 h-24 bg-white/20 dark:bg-gray-700/30 rounded-2xl"
              ></div>
            );
          })}
        </div>
      ))}
      {/* {selectedPcs.length > 0 && <div></div>} */}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PC = {
  id: string;
  name: string;
  status: "AVAILABLE" | "BOOKED" | "PENDING";
  row: number;
  column: number;
};

export default function PcComp({
  tableId,
  setSelectedPcs,
  selectedPcs,
}: {
  tableId: string;
  setSelectedPcs: (selectedPcs: string[]) => void;
  selectedPcs: string[];
}) {
  const [pcs, setPcs] = useState<PC[]>([]);

  // Load all PCs initially
  useEffect(() => {
    const loadPCs = async () => {
      const { data } = await supabase
        .from("PC")
        .select("id, name, status, column, row")
        .eq("tableId", tableId);
      setPcs(data || []);
    };
    loadPCs();
  }, [tableId]);
  const maxRow = Math.max(...pcs.map((pc) => pc.row), 0);
  const maxCol = Math.max(...pcs.map((pc) => pc.column), 0);
  useEffect(() => {
    const channel = supabase
      .channel("pc-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "PC",
        },
        (payload) => {
          const updated = payload.new as PC;
          setPcs((prev) =>
            prev.map((pc) => (pc.id === updated.id ? updated : pc))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const bookPC = async (pc: PC) => {
    if (pc.status === "BOOKED") return;
    if (pc.status === "PENDING" && selectedPcs.find((pcId) => pc.id === pcId)) {
      await supabase.from("PC").update({ status: "AVAILABLE" }).eq("id", pc.id);
      setSelectedPcs(selectedPcs.filter((pcID) => pcID !== pc.id));
    } else if (pc.status === "AVAILABLE" && !selectedPcs.includes(pc.id)) {
      await supabase.from("PC").update({ status: "PENDING" }).eq("id", pc.id);
      setSelectedPcs([...selectedPcs, pc.id]);
    }
  };

  const getStatusClass = (status: "AVAILABLE" | "PENDING" | "BOOKED") => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-500";
      case "PENDING":
        return "bg-yellow-100 ";
      case "BOOKED":
        return "bg-red-500";
      default:
        return "";
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
                  onClick={() => bookPC(pc)}
                  className={`w-24 h-24 rounded-2xl ${getStatusClass(
                    pc.status
                  )} text-white p-4 ${
                    selectedPcs.find((p)=>p===pc.id) && 'border-2 border-blue-400 bg-yellow-400'
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
    </div>
  );
}

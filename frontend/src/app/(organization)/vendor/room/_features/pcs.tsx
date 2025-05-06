import { PC } from "@/Types/types";
import { deleteTable } from "@/utils/request/vendor";
import { X } from "lucide-react";
import { useState } from "react";

export function PCs({ pcs }: { pcs: PC[] }) {
  const maxRow = Math.max(...pcs.map((pc) => pc.row), 0);
  const maxCol = Math.max(...pcs.map((pc) => pc.column), 0);

  const [localPCs, setLocalPCs] = useState<PC[]>(pcs);

  const deletePCItem = async (id: string) => {
    const items = localStorage.getItem("pcs");
    if (items) {
      const parsedItems: PC[] = JSON.parse(items);
      const filtered = parsedItems.filter((pc) => pc.id !== id);
      localStorage.setItem("pcs", JSON.stringify(filtered));
      setLocalPCs(filtered);
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteTable(id);
    if (success) {
      deletePCItem(id);
    }
  };
  return (
    <div className="flex flex-col gap-2 p-4">
      {Array.from({ length: maxRow }, (_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {Array.from({ length: maxCol }, (_, colIndex) => {
            const pc = localPCs.find(
              (pc) => pc.row === rowIndex + 1 && pc.column === colIndex + 1
            );

            return pc ? (
              <div key={colIndex} className="relative group">
                <div
                  className={`w-24 h-24 flex items-center justify-center rounded-2xl shadow-xl text-base font-bold transition-all duration-300 transform group-hover:scale-110 cursor-pointer backdrop-blur-md ${
                    pc.status === "BOOKED"
                      ? "bg-red-500 text-white ring-4 ring-red-500/60"
                      : "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white ring-4 ring-yellow-500/60"
                  }`}
                >
                  {pc.name}
                  <button
                      onClick={() => handleDelete(pc.id)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded hover:bg-opacity-80"
                    title="Устгах"
                  >
                    <X/>
                  </button>
                </div>
              </div>
            ) : (
              <div key={colIndex} className="w-10 h-10"></div> // empty space
            );
          })}
        </div>
      ))}
    </div>
  );
}

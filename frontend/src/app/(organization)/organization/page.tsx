"use client";

import { AddRoom } from "./_features/AddRoom";

export default function PCLayout() {
  const pcs = [
    { id: "1", name: "PC1", row: 1, column: 2, status: "AVAILABLE" },
    { id: "2", name: "PC2", row: 1, column: 3, status: "AVAILABLE" },
    { id: "3", name: "PC3", row: 2, column: 1, status: "BOOKED" },
  ];

  const maxRow = Math.max(...pcs.map((pc) => pc.row), 0);
  const maxCol = Math.max(...pcs.map((pc) => pc.column), 0);

  return (
    <div>
      <AddRoom/>
      <div className="flex flex-col gap-2 p-4">
        {Array.from({ length: maxRow }, (_, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {Array.from({ length: maxCol }, (_, colIndex) => {
              const pc = pcs.find(
                (pc) => pc.row === rowIndex + 1 && pc.column === colIndex + 1
              );

              return pc ? (
                <div
                  key={colIndex}
                  className={`w-10 h-10 flex items-center justify-center text-xs rounded ${
                    pc.status === "BOOKED" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {pc.name}
                </div>
              ) : (
                <div key={colIndex} className="w-10 h-10"></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

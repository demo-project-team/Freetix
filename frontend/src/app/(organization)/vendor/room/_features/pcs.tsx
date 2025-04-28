import { PC } from "@/Types/types";

export function PCs({ pcs }: { pcs: PC[] }) {
  const maxRow = Math.max(...pcs.map((pc) => pc.row), 0);
  const maxCol = Math.max(...pcs.map((pc) => pc.column), 0);

  return (
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
              <div key={colIndex} className="w-10 h-10"></div> // empty space
            );
          })}
        </div>
      ))}
    </div>
  );
}

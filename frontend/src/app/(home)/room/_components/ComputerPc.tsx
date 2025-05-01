import { PC } from "@/Types/types";
export function ComputerPc({
  pcs,
  selectedPcs,
  setSelectedPcs,
}: {
  pcs: PC[];
  selectedPcs: string[];
  setSelectedPcs: (selectedPcs: string[]) => void;
}) {
  const maxRow = Math.max(...pcs.map((pc) => pc.row), 0);
  const maxCol = Math.max(...pcs.map((pc) => pc.column), 0);

  const togglePcSelection = (pc: string) => {
    const alreadySelected = selectedPcs.find((p) => p === pc);
    if (alreadySelected) {
      setSelectedPcs(selectedPcs.filter((p) => p !== pc));
    } else {
      setSelectedPcs([...selectedPcs, pc]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-10 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-500 dark:to-gray-900">
      {Array.from({ length: maxRow }, (_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-8">
          {Array.from({ length: maxCol }, (_, colIndex) => {
            const pc = pcs.find(
              (pc) => pc.row === rowIndex + 1 && pc.column === colIndex + 1
            );

            return pc ? (
              <div key={colIndex} className="relative group">
                <div
                  onClick={() => togglePcSelection(pc.id)}
                  className={`w-24 h-24 flex items-center justify-center rounded-2xl shadow-xl text-base font-bold transition-all duration-300 transform group-hover:scale-110 cursor-pointer backdrop-blur-md ${
                    selectedPcs.find((p) => p === pc.id)
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white ring-4 ring-yellow-500/60"
                      : pc.status === "BOOKED"
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
      {selectedPcs.length > 0 && <div></div>}
    </div>
  );
}

import { PC, Time } from "@/Types/types";
export function ComputerPc({
  pcs,
  selectedPcs,
  setSelectedPcs,
  unavailablePcs,
}: {
  pcs: PC[];
  selectedPcs: string[];
  setSelectedPcs: (selectedPcs: string[]) => void;
  unavailablePcs: Time[];
}) {
  const maxRow = Math.max(...pcs.map((pc) => pc.row), 0);
  const maxCol = Math.max(...pcs.map((pc) => pc.column), 0);

  const togglePcSelection = (pc: PC) => {
    const alreadySelected = selectedPcs.find((p) => p === pc.id);
    if (unavailablePcs.find((p)=>p.pcId === pc.id)) {
      return
    }
    if (alreadySelected) {
      setSelectedPcs(selectedPcs.filter((p) => p !== pc.id));
    } else {
      setSelectedPcs([...selectedPcs, pc.id]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-10">
      {Array.from({ length: maxRow }, (_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {Array.from({ length: maxCol }, (_, colIndex) => {
            const pc = pcs.find(
              (pc) => pc.row === rowIndex + 1 && pc.column === colIndex + 1
            );
            return pc ? (
              <div key={colIndex} className="relative group">
                <div
                  onClick={() => togglePcSelection(pc)}
                  className={`w-10 h-10 lg:w-20 lg:h-20 flex items-center justify-center rounded-md shadow-xl text-sm text-base font-bold transition-all duration-300 transform group-hover:scale-110 cursor-pointer backdrop-blur-md ${
                    selectedPcs.find((p) => p === pc.id)
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white ring-4 ring-yellow-500/60"
                      : unavailablePcs.find((p) => pc.id === p.pcId)
                      ? "bg-gray-400 cursor-not-allowed text-gray-100"
                      : "bg-teal-500 hover:bg-teal-600 cursor-pointer text-white"
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

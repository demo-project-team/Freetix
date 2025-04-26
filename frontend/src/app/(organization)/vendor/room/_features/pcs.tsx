import { PC } from "@/Types/types";

const PCs = ({ pcs }: { pcs: PC[] }) => {
  return (
    <div className="grid w-60 grid-cols-2 gap-4 p-4">
      {pcs.map((pc) => (
        <button
          key={pc.id}
          className="w-24 h-24 rounded-lg bg-green-200 hover:bg-green-300"
        >
          {pc.name}
        </button>
      ))}
    </div>
  );
};
export default PCs;

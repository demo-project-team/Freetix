import { PC } from "@/Types/types";
import { useState } from "react";

export function ComputerPc({ pcs }: { pcs: PC[] }) {
  const [selectedPcs, setSelectedPcs] = useState<{ name: string; status: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); 

  const maxRow = Math.max(...pcs.map((pc) => pc.row), 0);
  const maxCol = Math.max(...pcs.map((pc) => pc.column), 0);

  const togglePcSelection = (pc: { name: string; status: string }) => {
    const alreadySelected = selectedPcs.find((p) => p.name === pc.name);
    if (alreadySelected) {
      setSelectedPcs(selectedPcs.filter((p) => p.name !== pc.name));
    } else {
      setSelectedPcs([...selectedPcs, pc]);
    }
  };


  const calculateTotalPrice = () => {
    const pricePerPc = 1000; 
    return selectedPcs.length * pricePerPc; 
  };

  const handleMoney = () => {
    if (selectedPcs.length === 0) {
      alert("Та суудал сонгоно уу!");
      return;
    }

    const updatedPcs = pcs.map((pc) => {
      if (selectedPcs.find((p) => p.name === pc.name)) {
        return { ...pc, status: "BOOKED" };
      }
      return pc;
    });
    console.log(updatedPcs);

    const pcNames = selectedPcs.map((pc) => pc.name).join(", ");
    alert(`${pcNames} суудлуудыг ${selectedTime}-д амжилттай захиаллаа!`);

 
    const price = calculateTotalPrice();
    setTotalPrice(price);

    setSelectedPcs([]);
    setSelectedTime("");
    setIsModalOpen(true); 
  };

  const handlePayment = () => {
    alert(`${totalPrice}₮ төлбөр амжилттай хийгдлээ!`);
    setIsModalOpen(false); 
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
                  onClick={() =>
                    togglePcSelection({ name: pc.name, status: pc.status })
                  }
                  className={`w-24 h-24 flex items-center justify-center rounded-2xl shadow-xl text-base font-bold transition-all duration-300 transform group-hover:scale-110 cursor-pointer backdrop-blur-md ${
                    selectedPcs.find((p) => p.name === pc.name)
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

      {selectedPcs.length > 0 && (
        <button
          onClick={handleMoney}
          className="mt-10 bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-xl text-lg shadow-lg transition"
        >
          Нэг дор {selectedPcs.length} суудал захиалах
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl w-96 text-center relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Сонгосон суудлууд</h2>
            <div className="text-gray-700 dark:text-gray-300 mb-4">
              {selectedPcs.map((pc) => pc.name).join(", ")}
            </div>

            <div className="flex flex-col items-center gap-2 mb-4">
              <label
                htmlFor="time"
                className="text-gray-600 dark:text-gray-300 text-sm"
              >
                Захиалах цаг:
              </label>
              <input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="border rounded-lg py-2 px-3 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mt-4 text-xl text-gray-700 dark:text-gray-300">
              Нийт төлбөр: {totalPrice}₮
            </div>

            <button
              onClick={handlePayment}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition"
            >
              Төлбөр хийх
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

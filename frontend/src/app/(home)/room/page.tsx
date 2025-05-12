"use client";

import { useTable } from "@/provider/TableProvider";
// import { ComputerPc } from "./_components/ComputerPc";
import { useState } from "react";
// import { useQueryState } from "nuqs";
// import { useRouter } from "next/navigation";
// import PcLoadingAnimation from "../pc/pcLoadingAnimation";
import PcComp from "./_components/SupabaseRealTime";
// import { LiveComputerPc } from "./_components/LiveTimePc";
import PcLoadingAnimation from "../pc/_components/pcLoadingAnimation";

export default function Room() {
  // const [loading, setLoading] = useState(false);
  const { table, isLoading } = useTable();
  // const [roomId] = useQueryState("roomid");
  // const router = useRouter();
  const [selectedPcs, setSelectedPcs] = useState<string[]>([]);
  
  // const createBooking = async (values: pcInput) => {
  //   if (!roomId) {
  //     return;
  //   }
  //   setLoading(true);
  //   const response = await putPc(values);
  //   console.log(response);

  //   if (response) {
  //     router.push(`/payment?payid=${response.pay.id}`);
  //     setLoading(false);
  //   }
  //   setLoading(false);
  // };
  if (isLoading) {
    return <PcLoadingAnimation />;
  }
  return (
    <div className="flex">
      {table.map((table, index) => (
        <div key={index} className="flex items-center justify-center">
          {/* <ComputerPc
            pcs={table.pcs}
            setSelectedPcs={setSelectedPcs}
            selectedPcs={selectedPcs}
          /> */}
          {/* <LiveComputerPc pc={table.pcs} /> */}
          <PcComp
            tableId={table.id}
            setSelectedPcs={setSelectedPcs}
            selectedPcs={selectedPcs}
          />
        </div>
      ))}
      {selectedPcs.length >= 1 && (
      <div>zahialgiin ui</div>
      )}
    </div>
  );
}

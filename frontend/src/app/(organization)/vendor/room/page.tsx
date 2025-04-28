"use client";
import { Button } from "@/components/ui/button";
import { useTable } from "@/provider/TableProvider";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import AddTable from "./_features/AddTable";
import { PCs } from "./_features/pcs";


const Home = () => {
  const router = useRouter();
  const [roomId] = useQueryState("roomid");
  console.log(roomId);
  const {table} = useTable()
  console.log(table);
  

  return (
    <div className="flex flex-col gap-5">
      <Button className="w-20" onClick={() => router.push("/vendor")}>Back</Button>
      <div>
        <AddTable/>
        <div className="grid grid-cols-3 gap-10">
          {table.map((tb, i)=>(
            <PCs key={i} pcs={tb.pcs}/>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;

'use client'

import { useTable } from "@/provider/TableProvider";
import { ComputerPc } from "./_components/ComputerPc";


export default function Room() {
const {table} = useTable() 
  return(
    <div>
        {table.map((table, index) => (
            <div key={index} className="flex items-center justify-center">
            <ComputerPc pcs={table.pcs}/>
            </div>
        ))}
    </div>
  )
}

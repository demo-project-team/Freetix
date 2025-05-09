"use client";

import { Table } from "@/Types/types";
import { getTable } from "@/utils/request/vendor";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { createContext, ReactNode, useContext } from "react";
type TableContextType = {
  table: Table[];
  refetchTable: () => void;
  isLoading: boolean;
};

const TableContext = createContext<TableContextType | null>(null);
export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [roomId] = useQueryState("roomid");
  const router = useRouter()
  const {
    data: table = [],
    refetch: refetchTable,
    isLoading,
  } = useQuery({
    queryKey: ["room", roomId, router],
    queryFn: () => getTable(roomId),
    enabled : !! roomId
  });

  return (
    <TableContext.Provider value={{ table, refetchTable, isLoading }}>
      {children}
    </TableContext.Provider>
  );
};
export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useUser must be used within a TableProvider");
  }
  return context;
};

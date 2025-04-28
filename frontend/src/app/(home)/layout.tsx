import { TableProvider } from "@/provider/TableProvider";
import { ReactNode } from "react";

export default function HomeLoayout({ children }: { children: ReactNode }) {
  return <TableProvider>{children}</TableProvider>;
}

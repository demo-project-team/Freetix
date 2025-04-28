'use client'

import { CategoryProvider } from "@/provider/categoryProvider";
import Maincontent from "./_features/mainContet";
import { useQueryState } from "nuqs";


export default function Home() {
  const [categotyid] = useQueryState("categoryid");
  if (!categotyid) {
    return;
  }
  return (
    <CategoryProvider id={String(categotyid)}>
      <Maincontent />
    </CategoryProvider>
 
  );
}

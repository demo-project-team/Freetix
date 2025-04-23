'use client'

import { CategoryProvider} from "@/provider/categoryProvider";
import { useParams } from "next/navigation";
import Maincontent from "../_features/mainContet";

export default function Home() {
    const {categoryId} = useParams()
    console.log(categoryId);
    
  return (
    <CategoryProvider id={String(categoryId)}>
        <Maincontent/>
    </CategoryProvider>
  );
}

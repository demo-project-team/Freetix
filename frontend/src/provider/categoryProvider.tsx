import { Category } from "@/Types/types";
import { getCategoryById } from "@/utils/request/categoryRequest";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
type CategoryContextType = {
  category: Category;
  refetchCategory: () => void;
};
const CategoryContext = createContext<CategoryContextType | null>(null);
export const CategoryProvider = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  console.log(id);
  
  const { data: category, refetch: refetchCategory } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <CategoryContext.Provider value={{ category, refetchCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useUser must be used within a CategoryProvider");
  }
  return context;
};

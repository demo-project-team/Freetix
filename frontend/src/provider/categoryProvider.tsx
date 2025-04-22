import { getCategoryById } from "@/utils/request/categoryRequest";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
type CategoryContextType = {
  categories: Category[];
  refetchCategory: () => void;
};
type Category = {
  name: string;
  id: string;
  icon: string;
};
const CategoryContext = createContext<CategoryContextType | null>(null);
export const CategoryProvider = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { data: categories = [], refetch: refetchCategory } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <CategoryContext.Provider value={{ categories, refetchCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

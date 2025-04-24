import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { getCategory } from "@/utils/request/categoryRequest";
import { useQuery } from "@tanstack/react-query";

type Category = {
    name: string;
    id: string;
    icon: string;
  };

export const GameOrder = () => {
    const { data: category = [] } = useQuery({
        queryKey: ["category"],
        queryFn: getCategory,
      });
  return (
    <Popover>
      <PopoverTrigger>
        <ChevronDown/>
      </PopoverTrigger>
      <PopoverContent>
        {category.map((category:Category, index) => (
            <div key={index} className="flex w-[260px] justify-center items-center mt-[10px]">
                <div className="flex h-[60px] items-center gap-2">
                    <p>{category.name}</p>
                </div>
            </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

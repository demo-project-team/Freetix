"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/Types/types";
import { getCategory } from "@/utils/request/categoryRequest";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const SelectCategory = ({
  defaultvalue,
  onValueChange,
}: {
  onValueChange: (selectedValues: string[]) => void;
  defaultvalue: string[];
}) => {
  const [categoriesName, setCategoriesName] = useState<string[]>([]);

  const { data: category = [] } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  const selectCategory = (value: string) => {
    if (!defaultvalue.includes(value)) {
      const selectedCat = category.find((c) => c.id === value);
      const name = selectedCat?.name || "Unknown";
      onValueChange([...defaultvalue, value]);
      setCategoriesName([...categoriesName, name]);
    }
  };

  return (
    <div>
      <div className="mb-2 max-h-[50px] overflow-scroll space-y-1">
        {categoriesName.map((val, i) => (
          <div key={i} className="text-sm px-2 py-1 bg-gray-900 rounded">
            {val}
          </div>
        ))}
      </div>
      <Select onValueChange={selectCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="h-80">
          {category.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCategory;

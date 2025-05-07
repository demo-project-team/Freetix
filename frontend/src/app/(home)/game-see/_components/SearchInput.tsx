"use client";

import { Input } from "@/components/ui/input";
import { FC } from "react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchInput: FC<SearchInputProps> = ({ value, onChange, placeholder }) => (
  <Input
    className="max-w-md"
    placeholder={placeholder || "Хайлт хийх..."}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchInput;

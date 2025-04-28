"use client";
import { useOrganization } from "@/provider/OrganizationPrider";
import TableCont from "./_components/TableCont";
import { useState } from "react";
import { postCategory } from "@/utils/request/categoryRequest";

export default function Home() {
  const { organization } = useOrganization();
  console.log(organization);
  const [category, setCategory] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCategory(value);
  };

  const handlePostClick = async () => {
    if (category) {
      await postCategory({ name: category });
    } else {
      alert("Please enter a category.");
    }
  };
  if (!organization) return;
  return (
    <div className="flex gap-8 flex-wrap">
      {organization.map((org, i) => (
        <TableCont key={i} org={org} />
      ))}
      <div className="mb-4">
        <input
          type="text"
          value={category}
          onChange={handleInputChange}
          placeholder="Enter category"
          className="w-full px-4 py-2 border text-black rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500"
        />
        <button
          onClick={handlePostClick}
          className="mt-2 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gr focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Post
        </button>
      </div>
    </div>
  );
}

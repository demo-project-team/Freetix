"use client";
import { useState } from "react";

export default function DescriptionSection() {
  const [expanded, setExpanded] = useState(false);
  const description = `Msports Plus гишүүд 1 удаа үнэгүй үйлчлүүлэх боломжтой`;

  return (
    <div className="space-y-2">
      <h2 className="text-base font-medium">Танилцуулга</h2>
      <p className="text-sm text-gray-700 line-clamp-2">
        {expanded ? description : `${description.slice(0, 90)}...`}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-blue-600 hover:underline"
      >
        {expanded ? "Хураах" : "Дэлгэрэнгүй"}
      </button>
    </div>
  );
}

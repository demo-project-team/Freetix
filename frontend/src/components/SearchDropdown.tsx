"use client";
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
// import clsx from "clsx";

const mockData = ["PlayStation", "Nintendo", "Steam", "Epic Games", "XBox"];

export default function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = mockData.filter((item) =>
    item.toLowerCase().includes(term.toLowerCase())
  );

  // Outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setTerm("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-white/10 transition"
      >
        <Search className="w-5 h-5 text-white" />
      </button>

      {/* Overlay + input */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div ref={ref} className="w-full max-w-md">
            <div className="bg-[#1f1f1f] rounded-xl px-4 py-3 shadow-lg w-full">
              <input
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search Docs..."
                className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full"
              />
            </div>

            {/* Dropdown results */}
            {term && (
              <ul className="bg-[#1f1f1f] mt-2 rounded-xl shadow-lg overflow-hidden">
                {filtered.length ? (
                  filtered.map((item, i) => (
                    <li
                      key={i}
                      className="p-3 hover:bg-white/10 text-white cursor-pointer"
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-gray-400">No results</li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Vendor = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
};

export default function SearchDropdown() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Vendor[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchVendors = async () => {
    if (!term) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/vendora?name=${encodeURIComponent(term)}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Search fetch error:", err);
      setResults([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVendors();
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "Enter") {
        console.log("Search term:", term);
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      setTerm("");
      setResults([]);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, term]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="p-2 rounded-full hover:bg-white/10 transition cursor-pointer">
          <Search className="w-5 h-5 text-gray-400 hover:text-white transition duration-300" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          aria-hidden="true"
        />

        <Dialog.Content className="fixed inset-150 flex items-center  justify-center z-50 px-4">
          <div className="w-full max-w-2xl bg-[#1f1f1f] rounded-xl p-4 shadow-lg absolute fixed top-60">
            <Dialog.Title asChild>
              <VisuallyHidden>Search Dialog</VisuallyHidden>
            </Dialog.Title>

            <div className="relative  w-full">
              <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                ref={inputRef}
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search Vendors..."
                className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full pl-10 pr-10"
              />

              {term && (
                <button
                  onClick={() => setTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {term && (
              <ul className="bg-[#1f1f1f] mt-2 rounded-xl shadow-lg overflow-hidden max-h-[300px] overflow-y-auto">
                {results.length ? (
                  results.map((vendor) => (
                    <li
                      key={vendor.id}
                      onClick={() => {
                        console.log("Selected vendor:", vendor);
                        setOpen(false);
                      }}
                      className="flex justify-between items-center p-3 hover:bg-white/10 text-white cursor-pointer"
                    >
                      {vendor.name}

                      {vendor.email && (
                        <div className="text-sm text-gray-400">
                          {vendor.email}
                        </div>
                      )}

                      {vendor.phone && (
                        <div className="text-sm text-gray-400">
                          {vendor.phone}
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-gray-200 flex justify-center">
                    No results found
                  </li>
                )}
              </ul>
            )}
          </div>
        </Dialog.Content>

        <Dialog.Close asChild>
          <button className="absolute top-0 right-0 p-4" aria-label="Close">
            ✕
          </button>
        </Dialog.Close>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

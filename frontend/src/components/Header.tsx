"use client";

import { getCategory } from "@/utils/request/categoryRequest";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GameOrder } from "./Gameorder";
import { OpenUser } from "./Openuser";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const router = useRouter();
  const { data: category = [] } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  console.log(category);

  const [search, SetSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b text-gray-800 px-10 sticky top-0 z-20">
      <div className="flex items-center justify-between px-5 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <h3
            className="text-4xl font-black  text-transparent bg-clip-text bg-gradient-to-r uppercase from-cyan-400 to-purple-600 drop-shadow-[0_0_15px_rgba(58,150,221,0.5)]"
            onClick={() => router.push("/")}
          >
            GameStop
          </h3>
        </div>
        <div className="hidden md:flex flex-1 mx-4">
          <form onSubmit={handleSearch} className="w-full flex">
            <input
              type="text"
              value={search}
              onChange={(e) => SetSearch(e.target.value)}
              placeholder="Search games, consoles & more"
              className="w-full px-4 py-2 border border-gray-300 rounded-l"
            />
            <button
              type="submit"
              className="bg-cyan-500 text-white px-4 rounded-r hover:bg-cyan-600"
            >
              Хайх
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-3">
          <OpenUser />
        </div>
      </div>
      <Carousel>
        <CarouselContent className="px-8 bg-gray-300 ">
          {category.map((category, i) => (
            <CarouselItem key={i} className="basis-1/12">
              <div>
                <h3 className="text-base gap-3 font-semibold mb-2 text-black flex hover:underline">
                  <p onClick={() => router.push(`/category/${category.id}`)}>
                    {category.name}
                  </p>
                  <GameOrder />
                </h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </header>
  );
};

export default Header;

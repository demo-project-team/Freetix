"use client";

import { ArrowRightLeft, Sparkles } from "lucide-react";
import { getCategory } from "@/utils/request/categoryRequest";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GameOrder } from "./Gameorder";
import { OpenUser } from "./Openuser";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter()
  const { data: category = [] } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  console.log(category);
  
  return (
    <header className="bg-white border-b text-gray-800 px-10">
      <div className="flex items-center justify-between px-5 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-4xl font-black  text-transparent bg-clip-text bg-gradient-to-r uppercase from-cyan-400 to-purple-600 drop-shadow-[0_0_15px_rgba(58,150,221,0.5)]">
            GameStop
          </h3>
        </div>
        <div className="hidden md:flex flex-1 mx-4">
          <input
            type="text"
            placeholder="Search games, consoles & more"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-3">
          <Button className="flex flex-col items-center text-xs px-4 py-3">
            <ArrowRightLeft width={25} height={25} />
            <p className="text-center text-base font-semibold">Trade-In</p>
          </Button>
          <Sparkles width={25} height={25} />
          <OpenUser />
        </div>
      </div>
      <Carousel>
        <CarouselContent className="px-8 bg-gray-300 ">
          {category.map((category, i) => (
            <CarouselItem key={i} className="basis-1/12">
              <div>
                <h3 className="text-base gap-3 font-semibold mb-2 text-black flex hover:underline">
                  <p onClick={()=>router.push(`/category/${category.id}`)}>{category.name}</p>
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

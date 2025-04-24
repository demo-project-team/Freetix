/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowRightLeft,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { getCategory } from "@/utils/request/categoryRequest";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GameOrder } from "./Gameorder";
import { OpenUser } from "./Openuser";


type Category = {
  name: string;
  id: string;
  icon: string;
};

const Header = () => {
  const { data: category = [] } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  return (
    <header className="bg-white border-b text-gray-800 px-10">
      <div className="flex items-center justify-between px-5 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-4xl font-black  text-transparent bg-clip-text bg-gradient-to-r uppercase from-cyan-400 to-purple-600 drop-shadow-[0_0_15px_rgba(58,150,221,0.5)]">GameStop</h3>
        </div>
        <div className="hidden md:flex flex-1 mx-4">
          <input
            type="text"
            placeholder="Search games, consoles & more"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex flex-col items-center text-xs">
            <ArrowRightLeft width={25} height={25} />
            <p className="text-center text-base font-semibold">Trade-In</p>
          </button>
          <button className="flex flex-col items-center text-xs">
            <Sparkles width={25} height={25} />
            <p className="text-center text-base font-semibold">GameStop Pro</p>
          </button>
          <button className="flex flex-col items-center text-xs">
            <OpenUser />
            <p className="text-center text-base font-semibold">Sign In</p>
          </button>
          <button className="flex flex-col items-center text-xs">
            <ShoppingCart width={25} height={25} />
            <p className="text-center text-base font-semibold">Cart</p>
          </button>
        </div>
      </div>
      <Carousel>
        <CarouselContent className="px-8 bg-gray-300 ">
          {category.map((category: Category, i) => (
            <CarouselItem key={i} className="basis-1/12">
              <div>
                <h3 className="text-base gap-3 font-semibold mb-2 text-black flex hover:underline">
                  {category.name}
                  <GameOrder />
                </h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-screen">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[600px]">
                  <div className="mt-[59px] mt-[80px] overflow-hidden w-full h-1/2 lg:h-full">
                    <img src="/shop.jpg" className="w-full sm:h-auto " />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </header>
  );
};

export default Header;

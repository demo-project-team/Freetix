"use client";
import { getCategory } from "@/utils/request/categoryRequest";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
type Category = {
  name: string
  id : string
  icon : string
}
export const Powerful = () => {
  const { data: category = [] } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  const router = useRouter()
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 relative pl-4 border-l-4 border-pink-500 text-white">
        Powerful Features
      </h2>
      <Carousel>
        <CarouselContent>
          {category.map((category:Category, i) => (
            <CarouselItem onClick={()=>router.push(`/category/${category.id}`)} key={i} className="basis-1/3 mt-10">
              <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-all">
                {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {category.name}
                </h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

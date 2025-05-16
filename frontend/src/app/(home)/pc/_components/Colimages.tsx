/* eslint-disable @next/next/no-img-element */

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@/Types/types";
const ColImages = ({ images }: { images: Image[] }) => {
  return (
    <Carousel orientation='vertical' className="overflow-hidden">
      <CarouselContent className="h-full">
        {images.map((image) => (
          <CarouselItem key={image.id} className="h-full">
            <div className="absolute bg-black/20 w-full h-full z-10"></div>
            <img src={image.url} alt="alt" className="h-[400px] w-full rounded-lg" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default ColImages;

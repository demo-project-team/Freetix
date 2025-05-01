/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { motion } from "framer-motion";

const HomeCaruesel = () => {
  return (
    <section id="home" className="relative w-full h-screen">
      <Carousel className="w-full h-full" plugins={[Autoplay({ delay: 5000 })]}>
        <CarouselContent>
          <CarouselItem className="w-full h-screen">
            <div className="relative w-full h-full">
              <img
                src="https://media.istockphoto.com/id/1354760356/photo/game-room-interior-with-modern-ambient-lights-and-powerful-super-computers-consoles-keyboards.jpg?s=612x612&w=0&k=20&c=TLX0y1rkOFzXkG_A3ph0Pa9Vjsnk4_vxr6JCL3n9PUk="
                alt="Gaming Room 1"
                className="object-cover w-full h-[1172px]"
              />
              <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="text-5xl md:text-6xl font-black tracking-tight mb-6 
             bg-gradient-to-r from-pink-400 via-purple-500 via-indigo-500 to-blue-500 
             bg-clip-text text-transparent font-display"
                >
                  Улаанбаатар хотын хамгийн шилдэг
                  <br /> компьютер тоглоомын газрууд
                </motion.h1>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="w-full h-screen">
            <div className="relative w-full h-full">
              <img
                src="https://images.pexels.com/photos/9072394/pexels-photo-9072394.jpeg?cs=srgb&dl=pexels-yankrukov-9072394.jpg&fm=jpg"
                alt="Gaming Room 2"
                className="object-cover w-full h-[1172px]"
              />
              <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
              <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="text-5xl md:text-6xl font-black tracking-tight mb-6 
             bg-gradient-to-r from-pink-400 via-purple-500 via-indigo-500 to-blue-500 
             bg-clip-text text-transparent font-display"
                >
                  Цахимаар захиал Цагаа хэмнэ
                  <br /> 
                </motion.h1>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="w-full h-screen">
            <div className="relative w-full h-full">
              <img
                src="https://uktechnews.co.uk/wp-content/uploads/2022/07/e-sports.png"
                alt="Gaming Room 3"
                className="object-cover w-full h-[1172px]"
              />
              <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
              <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="text-5xl md:text-6xl font-black tracking-tight mb-6 
             bg-gradient-to-r from-pink-400 via-purple-500 via-indigo-500 to-blue-500 
             bg-clip-text text-transparent font-display"
                >
                  Тав тухтай орчин таныг хүлээж байна
                  <br /> 
                </motion.h1>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
      </Carousel>
    </section>
  );
};
export default HomeCaruesel;

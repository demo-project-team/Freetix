'use client'
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export const SearchUp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <div className="relative mb-8 max-w-2xl">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-900/70 border border-gray-800 focus:border-pink-500 text-white rounded-full outline-none focus:ring-2 focus:ring-pink-500/40 transition-all"
        />
      </div>

      {/* Hero Section */}
      <section className="relative mb-12 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black p-8 border border-pink-500/20">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-full blur-3xl transform translate-x-1/3"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-500">
              Welcome to Freetix
            </h1>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Transform your ideas into reality with our powerful platform.
              Create, manage, and optimize your digital experience with the most
              intuitive tools available today.
            </p>
            <Button className="bg-cyan-600 hover:bg-pink-700 text-white px-6 py-6 rounded-full shadow-lg hover:shadow-pink-500/30 transition-all group">
              Get Started
              <ChevronRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </Button>
          </div>
          <div className="flex-1 md:flex-none md:w-2/5">
            <div className="relative w-full aspect-video bg-gray-800 rounded-xl overflow-hidden border border-pink-500/30 shadow-xl shadow-pink-500/10">
              <Image
                src="/gamezone.jpg"
                alt="DreamApp Interface"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
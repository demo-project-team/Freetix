"use client";

import { useRouter } from "next/navigation";
import { OpenUser } from "./Openuser";

const Header = () => {
    const router = useRouter();
  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="flex items-center space-x-2">
        <span className="text-3xl">🎮</span>
        <span
          className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
          onClick={() => router.push("/")}
        >
          eSlot
        </span>
      </div>

     
      <div className="hidden md:flex space-x-6 text-lg">
        <OpenUser />
      </div>
      <div className="md:hidden flex items-center space-x-4">
        <a href="#login" className="text-blue-400">
          Нэвтрэх
        </a>
        <a href="#viewed" className="text-blue-400">
          Үзсэн
        </a>
        <a href="#wallet" className="text-blue-400">
          Хэтэвч
        </a>
      </div>
    </header>
  );
};

export default Header;

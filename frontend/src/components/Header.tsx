"use client";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black bg-opacity-50 backdrop-blur-md">
    <div className="flex items-center space-x-2">
      <span className="text-3xl">🎮</span>
      <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
        NameHere!
      </span>
    </div>

    <div className="hidden md:flex space-x-6 text-lg">
      <a
        href="#login"
        className="hover:scale-110 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
      >
        Нэвтрэх
      </a>
      <a
        href="#booking"
        className="hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
      >
        Захиалга өгөх
      </a>
      <a
        href="#viewed"
        className="hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
      >
        Үзсэн
      </a>
      <a
        href="#wallet"
        className="hover:scale-105 hover:shadow-[0_0_15px_#60a5fa] transition-all duration-300"
      >
        Хэтэвч
      </a>
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

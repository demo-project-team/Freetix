/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useCategory } from "@/provider/categoryProvider";
import { Gamepad2 } from "lucide-react";

const Maincontent = () => {
  const { category } = useCategory();
  console.log(category);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white ">
      {/* Header */}
      <header className="py-10 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 drop-shadow-[0_0_15px_rgba(58,150,221,0.5)]">
          PC GAMING UNIVERSE
        </h1>
        <p className="text-gray-400 mt-2 tracking-wide">
          Join battles, compete in tournaments, and level up!
        </p>
        <div className="mt-6 h-1 w-32 bg-cyan-500 mx-auto rounded-full shadow-lg"></div>
      </header>

      {/* Game Genres */}
      <main className="px-6 md:px-12 lg:px-24 py-10 flex-grow">
        <h2 className="text-3xl font-bold text-cyan-300 mb-10 text-center animate-pulse">
          🕹️ Тоглоомын Төрлүүд
        </h2>
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-15 shadow-xl hover:shadow-[0_0_20px_#00fff7] transition-shadow duration-300 text-center">
              <img
                src="/shooter.jpg"
                className="w-full h-48 object-cover rounded-lg mb-6 border border-cyan-500 shadow-md"
                alt="FPS"
              />
              <h3 className="text-2xl font-extrabold text-cyan-400 mb-2">
                FPS Shooter
              </h3>
              <p className="text-gray-300 mb-4">
                Нарийн зорилго, хурдан шийдвэр гаргалт шаардсан тоглоом.
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2 rounded-full font-bold hover:scale-105 transition">
                Дэлгэрэнгүй
              </button>
            </div>

            {/* Snooker */}
            <div className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-15 shadow-xl hover:shadow-[0_0_20px_#c9184a] transition-shadow duration-300 text-center">
              <img
                src="/world.jpg"
                className="w-full h-48 object-cover rounded-lg mb-6 border border-cyan-500 shadow-md"
                alt="MMORPG"
              />
              <h3 className="text-xl font-bold  text-purple-400 mb-2">MMORPG</h3>
              <p className="text-gray-300 mb-4">
              Фэнтези ертөнцөд олон тоглогчтой адал явдал.
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2 rounded-full font-bold hover:scale-105 transition">
                Дэлгэрэнгүй
              </button>
            </div>

            {/* Raching */}
            <div className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-15 shadow-xl hover:shadow-[0_0_20px_#f7c59f] transition-shadow duration-300 text-center">
              <img
                src="/race.jpg"
                className="w-full h-48 object-cover rounded-lg mb-6 border border-cyan-500 shadow-md"
                alt="Racing"
              />
              <h3 className="text-xl font-bold text-pink-400 mb-2">Racing</h3>
              <p className="text-gray-300 mb-4">
                Өндөр хурд, мэдрэмжээр өрсөлдөх уралдаанууд.
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2 rounded-full font-bold hover:scale-105 transition">
                Дэлгэрэнгүй
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Futuristic Footer */}
      <footer className="relative bg-gradient-to-r from-[#1f1f3b] via-[#181830] to-[#1f1f3b] border-t border-gray-700 text-gray-400 px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left */}
          <div>
            <h2 className="text-xl font-bold text-purple-400 mb-3">
              PC Gaming Universe
            </h2>
            <p className="text-sm text-gray-400">
              Next-gen gaming experience. Stay competitive, stay cool.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">
              Холбоосууд
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Нүүр
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Тоглоомын төрлүүд
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Тэмцээнүүд
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Холбоо барих
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">
              Биднийг дагах
            </h3>
            <div className="flex space-x-4">
              <a href="#">
              <Gamepad2 />
              </a>
              <a href="#">
                <img
                  src="/icons/youtube.svg"
                  className="w-6 h-6 hover:scale-125 transition"
                />
              </a>
              <a href="#">
                <img
                  src="/icons/twitch.svg"
                  className="w-6 h-6 hover:scale-125 transition"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-10 text-gray-500">
          © 2025 PC Gaming Universe. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
export default Maincontent;

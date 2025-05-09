/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { OpenUser } from "./Openuser";
import { useUser } from "@/provider/UserProvider";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import { logoutUser } from "@/utils/request/authRequest";
import { Notification } from "./NotificationSend";

const Header = () => {
  const router = useRouter();
  const { user, refetchUser } = useUser();
  console.log(user);
  const handlelogOut = async () => {
    await logoutUser();
    refetchUser();
  };
  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black bg-opacity-50 backdrop-blur-md">
      <motion.div
        className="flex items-center space-x-2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onClick={() => router.push("/")}
      >
        <img src="eslot-logo.png" alt="" className="w-[195px] h-[45px]" />
        {/* <motion.span
          className="text-4xl"
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          🎮
        </motion.span>
        <motion.span
          className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          eSlot
        </motion.span> */}
      </motion.div>
      <div className="hidden md:flex space-x-6 text-lg">
        {user ? (
          <div>
            {" "}
            <div className="flex items-center justify-center">
              <User /> {user.name}
            </div>
            <div onClick={handlelogOut}>log out</div>
          </div>
        ) : (
          <OpenUser />
        )}
      </div>

      <div className="md:hidden flex items-center space-x-4">
        <a href="#login" className="text-blue-400">
          Нэвтрэх
          {user?.name}
        </a>
        <a href="#viewed" className="text-blue-400">
          Үзсэн
        </a>
        <a href="#wallet" className="text-blue-400">
          Хэтэвч
        </a>
      </div>
      <Notification />
    </header>
  );
};

export default Header;

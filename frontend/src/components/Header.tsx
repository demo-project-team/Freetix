/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { OpenUser } from "./Openuser";
import { useUser } from "@/provider/UserProvider";
import { User } from "lucide-react";
import { logoutUser } from "@/utils/request/authRequest";
import { Notification } from "./NotificationSend";

const Header = () => {
  const router = useRouter();
  const { user, refetchUser } = useUser();

  const handlelogOut = async () => {
    await logoutUser();
    refetchUser();
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => router.push("/")}
        >
          <img src="eslot-logo.png" alt="" className="w-[145px] h-[35px]" />
        </motion.div>

        {/* Desktop Items */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-1">
                <User className="w-5 h-5" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={handlelogOut}
                className="text-red-400 hover:underline"
              >
                Гарах
              </button>
            </div>
          ) : (
            <>
              <a href="#sign-up">Register Your Business</a>
              <OpenUser />
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4 text-sm text-blue-400">
          <a href="#login">Login {user?.name && `(${user.name})`}</a>
          <a href="#viewed">Sign up</a>
          <a href="#sign-up">Register Your Business</a>
        </div>
      </div>
      <Notification />
    </header>
  );
};

export default Header;

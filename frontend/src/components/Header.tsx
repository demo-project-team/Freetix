/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { OpenUser } from "./Openuser";
import { useUser } from "@/provider/UserProvider";
import { User, LogOut } from "lucide-react";
import { getUser, logoutUser } from "@/utils/request/authRequest";
import SearchDropdown from "./SearchDropdown";
import { SignUp } from "./Admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useBooking } from "@/provider/BookingProvider";

const Header = () => {
  const router = useRouter();
  const { user, refetchUser } = useUser();
  const { booking } = useBooking();
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: getUser,
  });
  const handlelogOut = async () => {
    await logoutUser();
    await refetchUser();
    setOpenDialog(false);
  };

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <header
      className="sticky top-4 left-0 right-0 z-50 mx-auto px-4 py-2 flex justify-between items-center
       max-w-7xl rounded-xl backdrop-blur-md bg-black/80 transition-all duration-300 ease-in-out"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(8, 8, 8, 0.6)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 0 12px rgba(255, 255, 255, 0.3)",
      }}
    >
      <div className="max-w-7xl px-4 mx-auto flex justify-between items-center w-full">
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
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <SearchDropdown />
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="relative">
                Booking{" "}
                {booking?.find((book) => book.status === "CONFIRMED") && (
                  <div className="absolute flex items-center justify-center top-2 right-2 w-2 h-2 bg-green-400 text-sm rounded-full animate-pulse"></div>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogClose>X</DialogClose>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>
              {booking?.map((book) => (
                <div
                  key={book.id}
                  className={`border ${
                    book.status === "CANCELLED" && "border-red-400"
                  } ${book.status === "CONFIRMED" && "border-green-400"} ${
                    book.status === "COMPLETED" && "border-gray-400 bg-gray-300"
                  } ${book.status === "PENDING" && "border-yellow-400"}`}
                >
                  <div>{book.status}</div>
                  <div className="flex gap-2">
                    Эхлэх:
                    <div>{book.orderedTime[0].start}</div>
                  </div>
                  <div className="flex gap-2">
                    Дуусах:
                    <div>{book.orderedTime[0].end}</div>
                  </div>
                  <div>нийт дүн: {book.payment.amount}</div>
                  <div>pcs : {book.pcs.length}</div>
                  <div>
                    <div>{book.orderedTime[0].vendor.name}</div>
                    <div>{book.pcs[0].table.room.type}</div>
                  </div>
                </div>
              ))}
            </DialogContent>
          </Dialog>

          {user ? (
            <div className="flex items-center space-x-9">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition">
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition text-sm text-gray-200">
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                  <DropdownMenuItem>
                    {userData?.profileImage ? (
                      <img
                        src={userData.profileImage}
                        className="w-12 h-12 bg-gray-200 rounded-full"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-900 border border-cyan-500 shadow-[0_0_10px_#06b6d4] flex items-center justify-center hover:shadow-[0_0_15px_#06b6d4] transition">
                        <User className="w-4 h-4 text-cyan-400" />
                      </div>
                    )}
                    <p className="text-sm font-semibold">{user.name}</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem>email : {user.email}</DropdownMenuItem>
                  <DropdownMenuItem>{userData?.phone}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                onClick={handlelogOut}
                className="flex items-center justify-center text-white gap-1 rounded-sm bg-red-500 cursor-pointer py-1.5 px-2.5 font-medium hover:opacity-50 transition-all duration-300 "
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          ) : (
            <>
              <div
                onClick={() => SignUp}
                className="text-gray-400 font-medium text-sm tracking-tighter leading-tight hover:text-white transition duration-300"
              >
                <SignUp />
              </div>
              <OpenUser />
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4 text-sm text-blue-400">
          <a href="#login">Login {user?.name && `(${user.name})`}</a>
          <a href="#viewed">Sign up</a>
          <a href="/sign-up">Register Your Business</a>
        </div>
      </div>
    </header>
  );
};
//  className="text-gray-400 font-medium text-sm tracking-tighter leading-tight hover:text-white transition duration-300 flex items-center space-x-1"
// w-5 h-5
export default Header;

// "use client";

// import { useRouter } from "next/navigation";
// import { OpenUser } from "./Openuser";
// import { useUser } from "@/provider/UserProvider";
// import { User } from "lucide-react";
// import { motion } from "framer-motion";
// import { logoutUser } from "@/utils/request/authRequest";

// const Header = () => {
//   const router = useRouter();
//   const { user, refetchUser } = useUser();
//   console.log(user);
//   const handlelogOut = async () => {
//     await logoutUser();
//     refetchUser();
//   };
//   return (
//     <header className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black bg-opacity-50 backdrop-blur-md">
//       <motion.div
//         className="flex items-center space-x-2 cursor-pointer"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         onClick={() => router.push("/")}
//       >
//         <img src="eslot-logo.png" alt="" className="w-[195px] h-[45px]" />
//         {/* <motion.span
//           className="text-4xl"
//           animate={{ rotate: [0, 20, -20, 0] }}
//           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//         >
//           🎮
//         </motion.span>
//         <motion.span
//           className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
//           whileHover={{ scale: 1.1 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           eSlot
//         </motion.span> */}
//       </motion.div>
//       <div className="hidden md:flex space-x-6 text-lg">
//         {user ? (
//           <div>
//             {" "}
//             <div className="flex items-center justify-center">
//               <User /> {user.name}
//             </div>
//             <div onClick={handlelogOut}>log out</div>
//           </div>
//         ) : (
//           <OpenUser />
//         )}
//       </div>

//       <div className="md:hidden flex items-center space-x-4">
//         <a href="#login" className="text-blue-400">
//           Нэвтрэх
//           {user?.name}
//         </a>
//         <a href="#viewed" className="text-blue-400">
//           Үзсэн
//         </a>
//         <a href="#wallet" className="text-blue-400">
//           Хэтэвч
//         </a>
//       </div>
//     </header>
//   );
// };

// export default Header;

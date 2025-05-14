"use client";
import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Booking } from "@/Types/types";
import { getBookings } from "@/utils/request/authRequest";
type BookingContexType = {
  booking: Booking[] | null;
  refetchBooking: () => void;
};
const BookingContex = createContext<BookingContexType | null>(null);
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const { data: booking = [], refetch: refetchBooking } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return (
    <BookingContex.Provider value={{ booking, refetchBooking }}>
      {children}
    </BookingContex.Provider>
  );
};
export const useBooking = () => {
  const context = useContext(BookingContex);
  if (!context) {
    throw new Error("useUser must be used within a BookingProvider");
  }
  return context;
};

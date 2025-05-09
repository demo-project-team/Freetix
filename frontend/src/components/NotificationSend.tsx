'use client'

import { useSocket } from "@/provider/SocketProvider";
import { useEffect } from "react";

export const Notification = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      return  
    }
    socket.on("notificationSend", (data) => {
      console.log("🔔 Notification:", data.message);
      // Жишээ нь: toast(data.message)
    });

    return () => {
      socket.off("notificationSend");
    };
  }, [socket]);

  return <div>Realtime Notification listener active</div>;
};

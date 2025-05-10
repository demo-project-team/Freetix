"use client";

import { useSocket } from "@/provider/SocketProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Notification = () => {
  const socket = useSocket();
  const [message, setMessage] = useState<string[]>([]);
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("notificationSend", (data) => {
      setMessage([...message, data.message]);
      toast(data.message, {
        position: "top-right",
      });
    });

    return () => {
      socket.off("notificationSend");
    };
  }, [socket, message]);

  return (
    <div className="flex flex-col">
      {message.map((mes, i) => (
        <div key={i}>{mes}</div>
      ))}
    </div>
  );
};

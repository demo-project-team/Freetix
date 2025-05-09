"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./UserProvider";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const newSocket = io(
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SOCKET_URL!
        : "http://localhost:5000"
    );

    newSocket.on("connect", () => {
      newSocket.emit("registerUser", { userId: user.id });
      console.log("📡 Registered socket with userId:", user.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket; 
  };
  

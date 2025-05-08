import { connectedUsers, io } from "../socket";

interface SendMessageOptions {
  from: string;
  to: string; // could be userId or roomId
  message: string;
  isRoom?: boolean;
}

export const sendMessage = ({ from, to, message, isRoom = false }: SendMessageOptions) => {
  const payload = { from, message, timestamp: new Date() };

  if (isRoom) {
    console.log(`📨 ${from} sent to room ${to}: ${message}`);
    io.to(to).emit("chat-message", payload);
  } else if (connectedUsers.has(to)) {
    console.log(`📨 ${from} sent to user ${to}: ${message}`);
    io.to(to).emit("private-message", payload);
  } else {
    console.log(`⚠️ Target ${to} is not online`);
  }

  return { status: "success", message: payload.message,  };
};

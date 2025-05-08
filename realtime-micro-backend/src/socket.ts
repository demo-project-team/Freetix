import { Server, Socket } from "socket.io";

export const connectedUsers = new Map<string, string>();

interface JoinRoomPayload {
  roomId: string;
  userId: string;
}

interface ChatMessagePayload {
  roomId: string;
  message: string;
  from: string;
}

export let io: Server;

const registerSocket = (socketServer: Server) => {
  io = socketServer;

  io.on("connection", (socket: Socket) => {
    console.log(`🔌 Connected: ${socket.id}`);
    socket.on("register-user", (userId: string) => {
      connectedUsers.set(userId, socket.id);
      console.log(`✅ User ${userId} registered with socket ${socket.id}`);
      socket.join(userId); // private room for DMs if needed
    });

    socket.on("join-room", ({ roomId, userId }: JoinRoomPayload) => {
      console.log(`🚪 ${userId} joining room ${roomId}`);
      socket.join(roomId);
      io.to(roomId).emit("user-joined", { userId });
    });

    socket.on("chat-message", ({ roomId, message, from }: ChatMessagePayload) => {
      console.log(`💬 ${from} to ${roomId}: ${message}`);
      io.to(roomId).emit("chat-message", { from, message });
    });

    socket.on("disconnect", () => {
      console.log(`❌ Disconnected: ${socket.id}`);
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          socket.broadcast.emit("user-disconnected", { userId });
          break;
        }
      }
    });
  });

  return io;
};

export default registerSocket;

export const isUserOnline = (userId: string): boolean => {
  return connectedUsers.has(userId);
};

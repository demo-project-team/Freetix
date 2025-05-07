import { Server, Socket } from "socket.io";

export const connectedUsers = new Map<string, string>();

interface JoinCallPayload {
  roomId: string;
  userId: string;
}

interface CallSignalPayload {
  roomId: string;
  signal: any; // Define a more specific type if possible
  from: string;
}

export let io: Server;

const registerSocket = (socketServer: Server) => {
  io = socketServer;

  io.on("connection", (socket: Socket) => {
    console.log(`⚡ Client connected: ${socket.id}`);

    socket.on("register-user", (userId: string) => {
      console.log(`👤 User ${userId} registered with socket ${socket.id}`);
      connectedUsers.set(userId, socket.id);
      socket.join(userId);
    });

    socket.on("join-call", ({ roomId, userId }: JoinCallPayload) => {
      const previousRoom = [...socket.rooms][1];
      if (previousRoom) {
        socket.leave(previousRoom);
      }

      console.log(`🔗 User ${userId} joining call room ${roomId}`);
      socket.join(roomId);
      io.to(roomId).emit("user-joined", { userId });
    });

    socket.on("call-signal", ({ roomId, signal, from }: CallSignalPayload) => {
      console.log(`📡 Signal from ${from} in room ${roomId}`);
      socket.to(roomId).emit("call-signal", { signal, from });
    });

    socket.on("message", (data) => {
      console.log(`📩 Message received: ${data}`);
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log(`⚡ Client disconnected: ${socket.id}`);

      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          console.log(`👤 User ${userId} disconnected`);
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

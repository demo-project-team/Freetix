import { Server } from 'socket.io';
import { userSocketMap } from './socket-map';

export function registerSocketHandlers(io: Server) {
  io.on('connection', (socket) => {
    console.log('⚡ User connected:', socket.id);
    socket.on('registerUser', ({ userId }) => {
      userSocketMap.set(userId, socket.id);
      console.log(`🧍 User ${userId} registered with socket ${socket.id}`);
    });
    socket.on('disconnect', () => {
      for (const [userId, id] of userSocketMap.entries()) {
        if (id === socket.id) {
          userSocketMap.delete(userId);
          console.log(`👋 User ${userId} disconnected`);
          break;
        }
      }
    });
  });
}

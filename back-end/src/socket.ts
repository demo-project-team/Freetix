import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { userSocketMap } from './socket-map';

const prisma = new PrismaClient();

export function registerSocketHandlers(io: Server) {
  io.on('connection', (socket) => {
    console.log('⚡ User connected:', socket.id);
    socket.on('registerUser', ({ userId }) => {
      userSocketMap.set(userId, socket.id);
      console.log(`🧍 User ${userId} registered with socket ${socket.id}`);
    });
    socket.on('bookPC', async ({ pcId, status }) => {
      const newStatus = status === 'BOOKED' ? 'AVAILABLE' : 'BOOKED';

      await prisma.pC.update({
        where: { id: pcId },
        data: { status: newStatus },
      });

      io.emit('pcStatusUpdated', { pcId, status: newStatus });
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

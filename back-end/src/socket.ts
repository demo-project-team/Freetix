// socket-events.ts
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function registerSocketHandlers(io: Server) {
  io.on('connection', (socket) => {
    console.log('⚡ User connected:', socket.id);
    socket.on('bookPC', async ({ pcId, status }) => {
        console.log(status);
        
      if (status === 'BOOKED') {
        await prisma.pC.update({
          where: { id: pcId },
          data: { status: 'AVAILABLE' },
        });
        io.emit('pcStatusUpdated', { pcId, status: 'AVAILABLE' });
      } else if (status === 'AVAILABLE') {
        await prisma.pC.update({
          where: { id: pcId },
          data: { status: 'BOOKED' },
        });
        io.emit('pcStatusUpdated', { pcId, status: 'BOOKED' });
      }
    });

    socket.on('disconnect', () => {
      console.log('💨 User disconnected:', socket.id);
    });
  });
}

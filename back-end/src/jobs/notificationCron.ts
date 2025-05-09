// cron/nortifcation.ts
import cron from 'node-cron';
import { prisma } from '../lib/prisma';

import { Server } from 'socket.io';
import { getSocketIdByUserId } from '../socket-map';

export const nortifcation = (io: Server) => {
  cron.schedule('*/1 * * * *', async () => {
    const now = new Date();

    const dueBookings = await prisma.booking.findMany({
      where: {
        startTime: { lt: now },
        status: 'CONFIRMED',
      },
    });

    for (const booking of dueBookings) {
      const socketId = getSocketIdByUserId(booking.userId);
      if (socketId) {
        io.to(socketId).emit('notificationSend', {
          message: `🕒 Your booking has started at ${booking.startTime.toLocaleTimeString()}`,
        });
      }
    }
  });

  console.log('🔁 Booking status cron started.');
};

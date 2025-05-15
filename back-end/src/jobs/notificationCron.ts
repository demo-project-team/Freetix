// cron/nortifcation.ts
import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import nodemailer from 'nodemailer';
import { Server } from 'socket.io';
import { getSocketIdByUserId } from '../socket-map';
import 'dotenv/config';

async function sendEmail(email: string, message: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const mailOptions = {
    from: `"Freetix" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Төлбөр төлсөн баримт',
    html: `<div>${message}</div>`,
  };

  return transporter.sendMail(mailOptions);
}
export const nortifcation = (io: Server) => {
  cron.schedule('*/1 * * * *', async () => {
    const now = new Date();
    const inFiveMinutes = new Date(now.getTime() + 5 * 60 * 1000); // одоо + 5 минут
    const dueBookings = await prisma.booking.findMany({
      where: {
        orderedTime: {
          some: {
            start: { gte: now, lt: inFiveMinutes },
          },
        },
        status: 'CONFIRMED',
        notifcation: false,
      },
      include: {
        pcs: true,
        user: true,
        orderedTime : true
      },
    });

    for (const booking of dueBookings) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          notifcation: true,
        },
      });
      const socketId = getSocketIdByUserId(booking.userId);
      if (socketId) {
        io.to(socketId).emit('notificationSend', {
          message: `🕒 Your booking has started at ${booking.orderedTime[0].start.toLocaleTimeString()}`,
        });
      }
      await prisma.notifcation.create({
        data: {
          user: { connect: { id: booking.userId } },
          message: `🕒 Your booking has started at ${booking.orderedTime[0].start.toLocaleTimeString()}`,
        },
      });
      sendEmail(
        booking.user.email,
        `🕒 Your booking has started at ${booking.orderedTime[0].start.toLocaleTimeString()}`,
      );
    }
  });

  console.log('🔁 Booking status cron started.');
};

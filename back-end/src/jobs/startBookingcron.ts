// import cron from 'node-cron';
// import { prisma } from '../lib/prisma';
// import { getSocketIdByUserId } from '../socket-map';
// import { Socket } from 'socket.io';
// import nodemailer from 'nodemailer';
// async function sendEmail(email: string, message: string) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER!,
//       pass: process.env.EMAIL_PASS!,
//     },
//   });

//   const mailOptions = {
//     from: `"Freetix" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Төлбөр төлсөн баримт',
//     html: `<div>${message}</div>`,
//   };

//   return transporter.sendMail(mailOptions);
// }
// export function startBookingCron(io: Socket) {
//   cron.schedule('*/1 * * * *', async () => {
//     const now = new Date();
//     const inFiveMinutes = new Date(now.getTime() + 5 * 60 * 1000); // одоо + 5 минут

//     try {
//       await prisma.$transaction(async (tx) => {
//         const upcomingSchedules = await tx.timeSchedule.findMany({
//           where: {
//             start: {
//               gte: now,
//               lt: inFiveMinutes,
//             },
//           },
//           include: {
//             booking: {
//               include: {
//                 user: true,
//               },
//             },
//           },
//         });

//         for (const schedule of upcomingSchedules) {
//           await prisma.booking.updateMany({
//             where: {
//               id: schedule.bookingId,
//             },
//             data: {
//               notifcation: true,
//             },
//           });
//           if (schedule.booking.notifcation === true) {
//             return;
//           }
//           const user = schedule.booking?.user;
//           if (user) {
//             console.log(`🔔 Send notification to ${user.email} for booking at ${schedule.start}`);
//           }
//         }
//         const socketId = getSocketIdByUserId(upcomingSchedules[0].userId);
//         if (socketId) {
//           io.to(socketId).emit('notificationSend', {
//             message: `🕒 Your booking has started at ${upcomingSchedules[0].start.toLocaleTimeString()}`,
//           });
//         }

//         sendEmail(upcomingSchedules[0].booking.user.email, `🕒 Your booking has started at `);
//         console.log(`✔ Checked ${upcomingSchedules.length} upcoming schedules.`);
//       });
//     } catch (err) {
//       console.error('❌ Cron job error:', err);
//     }
//   });

//   console.log('🔁 Booking notification cron started.');
// }

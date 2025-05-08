import cron from 'node-cron';
import { prisma } from  "../lib/prisma"; // Prisma client замыг тохируулна

export function startBookingStatusCron() {
  cron.schedule('*/5 * * * *', async () => {
    const now = new Date();

    try {
      const completedBookings = await prisma.booking.findMany({
        where: {
          endTime: { lt: now },
          status: { in: ['PENDING', 'CONFIRMED'] },
        },
        include: { pcs: true },
      });

      for (const booking of completedBookings) {
        await prisma.pC.updateMany({
          where: { id: { in: booking.pcs.map((pc) => pc.id) } },
          data: { status: 'AVAILABLE' },
        });

        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: 'COMPLETED' },
        });
      }

      console.log(`✔ Updated ${completedBookings.length} bookings and their PCs.`);
    } catch (err) {
      console.log('❌Cron job error:', err);
    }
  });
  console.log('🔁 Booking status cron started.');
}

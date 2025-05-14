import cron from 'node-cron';
import { prisma } from '../lib/prisma'; // Prisma client замыг тохируулна

export function startBookingStatusCron() {
  cron.schedule('*/1 * * * *', async () => {
    const now = new Date();

    try {
      await prisma.$transaction(async (tx) => {
        const timeSchedules = await tx.timeSchedule.findMany({
          where: {
            end: { lt: now },
          },
        });
        const bookingIds = timeSchedules.map((t) => t.bookingId);
        if (bookingIds.length > 0) {
          await tx.booking.updateMany({
            where: {
              id: { in: bookingIds },
            },
            data: { status: 'COMPLETED' },
          });
        }
        console.log(`✔ Updated ${bookingIds.length} bookings and their PCs.`);
      });
    } catch (err) {
      console.error('❌ Cron job error:', err);
    }
  });

  console.log('🔁 Booking status cron started.');
}

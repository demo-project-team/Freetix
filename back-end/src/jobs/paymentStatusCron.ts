import cron from 'node-cron';
import { prisma } from '../lib/prisma';

export function startBookingCancelCron() {
  cron.schedule('*/5 * * * *', async () => {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 15 * 60 * 1000);

    try {
      const expiredBookings = await prisma.booking.findMany({
        where: {
          createdAt: { lt: cutoff },
          status: 'PENDING',
        },
        include: {
          pcs: true,
        },
      });

      for (const booking of expiredBookings) {
        await prisma.pC.updateMany({
          where: {
            id: { in: booking.pcs.map((pc) => pc.id) },
          },
          data: {
            status: 'AVAILABLE',
          },
        });
        
        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: 'CANCELLED' },
        });
        if (booking.paymentId) {
          await prisma.payment.delete({
            where: { id: booking.paymentId },
          });
        }
      }

      if (expiredBookings.length > 0) {
        console.log(`🚫 Canceled ${expiredBookings.length} unpaid bookings.`);
      }
    } catch (err) {
      console.error('❌ Error in cancel cron job:', err);
    }
  });

  console.log('🔁 Booking cancel cron started.');
}

import cron from 'node-cron';
import { prisma } from '../lib/prisma';

export function startBookingCancelCron() {
  cron.schedule('*/2 * * * *', async () => {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 2 * 60 * 1000);

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
        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: 'CANCELLED' },
        });
        if (booking.id) {
        await prisma.timeSchedule.deleteMany({
          where :{
            bookingId : booking.id
          }
        })}
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

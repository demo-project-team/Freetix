import cron from 'node-cron';
import { prisma } from '../lib/prisma';

export const pcStatusCronJob = () => {
  cron.schedule('*/2 * * * *', async () => {
    try {
      const pendingPC = await prisma.pC.findMany({
        where: {
          status: 'PENDING',
        },
        select: {
          id: true,
        },
      });

      if (pendingPC.length === 0) {
        console.log('✅ No pending PCs found to update.');
        return;
      }

      const ids = pendingPC.map((pc) => pc.id);

      const result = await prisma.pC.updateMany({
        where: {
          id: { in: ids },
        },
        data: {
          status: 'AVAILABLE',
        },
      });

      console.log(`✅ Updated ${result.count} PC(s) from PENDING to AVAILABLE.`);
    } catch (error) {
      console.error('❌ Error in PC status cron job:', error);
    }
  });

  console.log('🔁 PC status cron job started.');
};

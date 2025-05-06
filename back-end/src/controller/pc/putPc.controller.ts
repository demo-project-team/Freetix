import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const putPc = async (req: Request, res: Response) => {
  try {
    const userId = req.user1.id;
    const rawIds = req.query.ids;
    const roomId = req.params.roomId;
    const { startTime, duration } = req.body;
    if (typeof rawIds === 'string') {
      const ids = String(rawIds).split(',');
      if (!ids.length) {
        res.status(400).json({ message: 'Missing ids or status' });
        return;
      }
      const room = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
      });
      if (!room || !room?.pcPricePerHour) {
        res.status(400).json({ message: 'Room not found or price not set' });
        return;
      }
      const start = new Date(startTime);
      const end = new Date(start.getTime() + duration * 60 * 1000);
      console.log(start, end, userId);
      const user = await prisma.user.findFirst({
        where : {id : userId}
      })
      if (!user) {
        res.status(400).json({ message: 'user not found' });
        return
      }
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        res.status(400).json({ message: 'Invalid start or end time' });
        return;
      }
      const durationInHours = duration/60
      const pricePerHour = room?.pcPricePerHour;
      const totalAmount = durationInHours * pricePerHour * ids.length;
      const booking = await prisma.booking.create({
        data: {
          userId : user?.id,
          startTime: start,
          endTime: end,
          pcs: {
            connect: ids.map((id: string) => ({ id })),
          },
        },
      });
      const pay = await prisma.payment.create({
        data: {
          bookingId: booking.id,
          amount: totalAmount,
          method: 'CARD',
          transactionId: `txn_${Date.now()}`,
        },
      });
      const pc = await prisma.pC.updateMany({
        where: {
          id: {
            in: ids.map((id) => String(id)),
          },
        },
        data: {
          status: 'BOOKED',
        },
      });
      console.log(pc);

      res.status(200).json({ message: 'succes', pay, pc });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ error, message: 'Internal server error' });
  }
};

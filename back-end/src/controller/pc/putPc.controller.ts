import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const putPc = async (req: Request, res: Response) => {
  try {
    const userId = req.user1.id;
    const { pcIds, start, end, roomId } = req.body;
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      res.status(400).json('room id required');
      return;
    }
    const booking = await prisma.booking.create({
      data: {
        userId,
        pcs: {
          connect: pcIds.map((id: string) => ({ id })),
        },
      },
    });
    const startTime = new Date(start);
    const endTime = new Date(end);
    const hours = Math.abs(endTime.getTime() - startTime.getTime())/36e5;
    const amount = hours * room.pcPricePerHour * pcIds.length;
    const pay = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount,
        transactionId: `txn_${Date.now()}`,
        method: 'card',
      },
    });

    const timeScheduleEntries = pcIds.map((pcId: string) => {
      return {
        vendorId: room.vendorId,
        userId,
        bookingId: booking.id,
        pcId,
        start: new Date(start),
        end: new Date(end),
      };
    });

    await prisma.timeSchedule.createMany({
      data: timeScheduleEntries,
    });

    res.status(200).json({ message: 'succes', pay });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error, message: 'Internal server error' });
  }
};

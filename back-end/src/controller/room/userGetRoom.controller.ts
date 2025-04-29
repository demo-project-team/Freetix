import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const GetUserRoom = async (req: Request, res: Response) => {
  const vendorId = req.params.vendorId;
  try {
    const vendorroom = await prisma.room.findMany({
      where: {
        vendorId: vendorId,
      },
    });
    res.status(200).json(vendorroom);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Interval error', error });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const postRoom = async (req: Request, res: Response) => {
  try {
    const vendorId = req.params.vendorId;
    const { name, type , pcPricePerHour} = req.body;
    const room = await prisma.room.create({
      data: {
        name,
        type,
        vendor: {
          connect: { id: vendorId },
        },
        pcPricePerHour
      },
    });
    res.status(200).json({ room });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getRoom = async (req: Request, res: Response) => {
  try {
    const room = await prisma.room.findMany({
      where: {
        vendor: {
          OrganizationId: req.user1?.id,
        },
      },
    });
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

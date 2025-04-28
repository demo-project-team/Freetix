import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getTable = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  try {
    const table = await prisma.table.findMany({
      where: {
        roomId,
      },
      include: {
        pcs: true,
      },
    });
    res.status(200).json({ table });
  } catch (error) {
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getUnavailableTime = async (req: Request, res: Response) => {
  const { start, end } = req.body;
  try {
    const unavailableTime = await prisma.timeSchedule.findMany({
      where: {
        AND: [{ start: { lt: end } }, { end: { gt: start } }],
      },
      include: {
        pc: true,
      },
    });

    res.status(200).json(unavailableTime);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

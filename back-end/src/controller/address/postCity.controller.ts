import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
export const postCity = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    await prisma.city.create({
      data: {
        name,
      },
    });
    res.status(200).json({ success: true, message: 'city created' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Interval server error', error });
  }
};
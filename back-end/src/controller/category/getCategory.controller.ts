import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma';

export const getCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      include : {
        vendors : true
      }
    });
    res.status(200).json({ data: categories, succes: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

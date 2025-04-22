import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma';

export const getService = async (req: Request, res: Response): Promise<void> => {
  const { vendorId, categoryId } = req.query;
  try {
    const service = await prisma.service.findMany({
      where: {
        OR: [{ vendorId: vendorId as string }, { categoryId: categoryId as string }],
      },
    });
    res.status(200).json({ data: service, succes: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

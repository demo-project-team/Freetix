import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma';

export const getVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        reviews: true,
        address : true,
        rooms :true
      },
    });
    res.status(200).json({ data: vendors, succes: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

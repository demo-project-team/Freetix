import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma';

export const getVendorByOwner = async (req: Request, res: Response): Promise<void> => {
  const id = req.user1?.id;
  try {
    const vendor = await prisma.vendor.findFirst({
      where: {
        Organization: {
          id: id,
        },
      },
      include : {
        images : true
      }
    });
    res.status(200).json({ data: vendor, succes: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

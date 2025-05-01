import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma';

export const getOneVendor = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.vendorId
  try {
    const vendors = await prisma.vendor.findUnique({
        where : {
            id
        },
        include : {
            rooms : true
        }
    });
    res.status(200).json({ data: vendors, succes: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

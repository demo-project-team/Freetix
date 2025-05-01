import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export const getVendor = async (req: Request, res: Response): Promise<void> => {
  const { name, districtId } = req.query;
  const categoryFilter = req.query.category;
  const categoryIds: string[] = Array.isArray(categoryFilter)
    ? categoryFilter.map((id) => String(id))
    : categoryFilter
      ? [String(categoryFilter)]
      : [];
  const filter: Prisma.VendorWhereInput = {
    ...(name && {
      name: {
        contains: name as string,
        mode: 'insensitive',
      },
    }),
    ...(categoryIds.length > 0 && {
      categories: {
        some: {
          id: {
            in: categoryIds,
          },
        },
      },
    }),
    ...(districtId && {
      address: {
        district: {
          id: districtId as string,
        },
      },
    }),
  };
  try {
    const vendors = await prisma.vendor.findMany({
      where: filter,
      include: {
        categories: true,
        reviews: true,
      },
    });
    res.status(200).json({ data: vendors, succes: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

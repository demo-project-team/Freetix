import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma';

export const postService = async (req: Request, res: Response): Promise<void> => {
  const { name, description, durationMinutes, price, imageUrl } = req.body;
  const vendorId = req.query.vendorId;
  const categoryId = req.query.categoryId;
  try {
    const service = await prisma.service.create({
      data: {
        name,
        description,
        durationMinutes,
        price,
        imageUrl,
        vendorId: vendorId as string,
        categoryId: categoryId as string,
      },
    });
    res.status(200).json({ data: service, succes: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

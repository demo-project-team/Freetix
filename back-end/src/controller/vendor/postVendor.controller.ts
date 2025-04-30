import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const postVendor = async (req: Request, res: Response) => {
  try {
    const { name, description, mapLat, mapLng, phone, email, imageUrl } = req.body;
    const id = req.user1?.id;
    if (!id) {
      res.status(401).json({ message: 'Unauthorized: no organization ID found.' });
      return;
    }
    const rawCategoryIds = req.query.categoryId;
    if (typeof rawCategoryIds === 'string') {
      const categoryIds = rawCategoryIds.split(',');
      const newVendor = await prisma.vendor.create({
        data: {
          name,
          description,
          mapLat: mapLat ? parseFloat(mapLat) : null,
          mapLng: mapLng ? parseFloat(mapLng) : null,
          phone,
          email,
          imageUrl,
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },
          Organization: {
            connect: { id: id },
          },
        },
      });
      res.status(201).json(newVendor.OrganizationId);
    } else {
      res.status(401).json({ error: 'category type error' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      errorDetail: error instanceof Error ? error.message : error,
    });
  }
};

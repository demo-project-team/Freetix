import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const postVendor = async (req: Request, res: Response) => {
  try {
    const { name, description, location, mapLat, mapLng, phone, email, imageUrl } = req.body;
    const categoryId = req.params.categoryId;
    const newVendor = await prisma.vendor.create({
      data: {
        name,
        description,
        location,
        mapLat: mapLat ? parseFloat(mapLat) : null,
        mapLng: mapLng ? parseFloat(mapLng) : null,
        phone,
        email,
        imageUrl,
        categoryId,
      },
    });

    res.status(201).json(newVendor);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      errorDetail: error instanceof Error ? error.message : error,
    });
  }
};

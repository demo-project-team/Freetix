import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const addImage = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const OrganizationId = req.user1.id;
    await prisma.images.create({
      data: {
        vendor: {
          connect: {
            OrganizationId,
          },
        },
        url,
      },
    });
    res.status(200).json({ message: 'image created' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

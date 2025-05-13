import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getImage = async (req: Request, res: Response) => {
  try {
    const id = req.user1.id;
    const image = await prisma.images.findMany({
      where: {
        vendor: {
          OrganizationId: id,
        },
      },
    });
    res.status(200).json({ data: image });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

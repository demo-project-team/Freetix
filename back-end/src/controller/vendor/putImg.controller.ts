import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const putImage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const orgId = req.user1.id;
    await prisma.images.updateMany({
      where: {
        vendor: {
          OrganizationId: orgId,
        },
      },
      data: {
        status: 'VIEW',
      },
    });
    await prisma.images.update({
      where: {
        id,
      },
      data: {
        status: 'BACKGROUND',
      },
    });

    res.status(200).json({ message: 'image created' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const deleteImg = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.images.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: 'image created' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

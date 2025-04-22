import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma';

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const service = await prisma.service.delete({
      where: {
        id
      },
    });
    res.status(200).json({ data: service, succes: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

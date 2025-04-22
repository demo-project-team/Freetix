import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma';

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const categories = await prisma.category.delete({ where: { id } });
    res.status(200).json({ data: categories, succes: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

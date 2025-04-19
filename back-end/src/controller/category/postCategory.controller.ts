import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
const categorySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
});
export const postCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const validateDate = categorySchema.parse(req.body);
    const { name, icon } = validateDate;
    await prisma.category.create({
      data: {
        name,
        icon,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

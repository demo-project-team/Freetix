import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
export const postReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user1.id
    const { rating, comment, vendorId } = req.body;    
    console.log(userId);
    
    
    const review = await prisma.review.create({
      data: { rating, comment, userId, vendorId },
    });

    res.status(200).json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

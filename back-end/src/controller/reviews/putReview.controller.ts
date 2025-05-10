import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const putReview = async (req: Request, res:Response) => {
    try {
        const userId = req.user1.id
        const {rating, comment} = req.body
        
        const updated = await prisma.review.update({
            where: {
                id: userId
            },
            data: {
                rating,
                comment
            },
        });
        res.status(200).json({updated})
    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Not updated"
        })
        console.log(error);
    }
}
import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
export const getReview = async (req:Request, res:Response) => {
    try {
        const id = req.params.vendorId

        const reviews = await prisma.review.findMany({
            where: {
                id
            },
            include: {
                user: {
                    select: {name: true, profileImage : true}
                }
            },
        })
        res.status(200).json({reviews})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
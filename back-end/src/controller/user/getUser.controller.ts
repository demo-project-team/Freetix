import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getUser = async (req: Request, res: Response) => {
    const id = req.user1.id
    try {
        const user = await prisma.user.findUnique({
            where :{
                id
            },
            select : {
                id :true,
                email : true,
                phone : true,
                name : true,
                profileImage : true,
                points : true,
                bookings : true
            }
        })
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json(error)
    }
}
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createBooking = async (req:Request, res : Response) => {
    const userId = req.user1.id
    try {
        const booking = await prisma.booking.findMany({
            where : {
                userId
            }
        })
        res.status(200).json({data:booking})
    } catch (error) {
        res.status(500).json({error, message : "Internal server error"})
    }
}
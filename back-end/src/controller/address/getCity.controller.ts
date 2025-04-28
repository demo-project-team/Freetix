import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
export const getCity = async (req:Request, res:Response) => {
    try {
        const Cityname = await prisma.city.findMany()
        res.status(200).json({Cityname})
    } catch (error) {
        res.status(500).json({error})
    }
}
import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getDistrict = async (req: Request, res: Response) => {
    const cityId = req.params.cityId
    try {
        const CityDistrict = await prisma.district.findMany({
            where : {
                cityId : cityId
            }
        })
        res.status(200).json(CityDistrict)
    } catch (error) {
        res.status(500).json({error})
    }
}
import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const postAddress = async (req: Request, res: Response) => {
  try {
    const { street, SumOrKhoroo, districtId, cityId} = req.body;
    const id = req.user1.id;
    const address = await prisma.address.create({
      data: {
        street,
        district: {
          connect: { id: districtId as string },
        },
        city: {
          connect: { id: cityId as string },
        },
        SumOrKhoroo,
        vendor: {
          connect: { id },
        },
      },
    });
    res.status(200).json({ succes: true, address });
  } catch (error) {
    res.status(500).json({ error });
  }
};
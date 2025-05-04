import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const postDistrict = async (req: Request, res: Response) => {
  try {
    const cityId = req.params.id;
    const {name} = req.body;
    await prisma.district.create({
      data : {
        name,
        city : {
          connect : {
            id: cityId
          }
        }
      }
    });
    res.status(200).json({ success: true, message: 'Districts created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};
import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const postDistrict = async (req: Request, res: Response) => {
  try {
    const cityId = req.params.id;
    const districts = req.body;
    console.log(districts);

    if (!Array.isArray(districts) || districts.length === 0) {
      res.status(400).json({ success: false, message: 'District list is empty or invalid.' });
      return;
    }

    const data = districts.map((district) => ({
      name: district.name,
      cityId: cityId,
    }));

    await prisma.district.createMany({ data });

    res.status(200).json({ success: true, message: 'Districts created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};
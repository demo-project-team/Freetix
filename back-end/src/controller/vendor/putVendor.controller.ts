import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
export const putVendor = async (req: Request, res: Response) => {
  try {
    const id = req.user1.id;
    const { name, email, imageUrl, phone, description } = req.body;
    if (!id) {
      res.status(400).json({ message: 'vendor id not found' });
    }
    const updated = await prisma.vendor.update({
      where: {
        OrganizationId: id,
      },
      data: {
        name,
        imageUrl,
        phone,
        email,
        description,
      },
    });
    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Account not updated found',
    });
    console.log(error);
  }
};

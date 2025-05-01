import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const postAddress = async (req: Request, res: Response) => {
  try {
    const { street, SumOrKhoroo, districtId, cityId} = req.body;
    const id = req.user1.id;
    
    if (!id) {
       res.status(401).json({ success: false, message: "Unauthorized: user ID missing" });
       return
    }

    const vendor = await prisma.vendor.findUnique({ where: { OrganizationId : id } });
    if (!vendor) {
       res.status(404).json({ success: false, message: "Vendor not found" });
       return
    }

    const existingAddress = await prisma.address.findUnique({
      where: {vendorID: id }
    });

    if (existingAddress) {
       res.status(400).json({ success: false, message: "Vendor already has an address" });
       return
    }    
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
          connect: { id : vendor.id },
        },
      },
    });
    res.status(200).json({ succes: true, address });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error });
  }
};
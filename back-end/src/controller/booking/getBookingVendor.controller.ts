import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getBookingVendor = async (req: Request, res: Response) => {
  const OrganizationId = req.user1.id;
  try {
    const booking = await prisma.booking.findMany({
      where: {
        orderedTime: {
          some: {
            vendor: {
              OrganizationId,
            },
          },
        },
      },
      include: {
        pcs: true,
        user: true,
        payment: {
          select: {
            amount: true,
          },
        },
        orderedTime: {
          take: 1,
        },
      },
    });
    res.status(200).json({ data: booking });
  } catch (error) {
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

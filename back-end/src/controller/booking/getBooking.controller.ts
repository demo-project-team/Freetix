import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getBooking = async (req: Request, res: Response) => {
  const userId = req.user1.id;
  try {
    const booking = await prisma.booking.findMany({
      where: {
        userId,
        orderedTime: { some: {} },
        NOT : {
          status : "PENDING" 
        }
      },
      include: {
        payment: {
          select: {
            amount: true,
          },
        },
        orderedTime: {
          take: 1,
          include: {
            vendor: true,
          },
        },
        pcs: {
          select: {
            name: true,
            table: {
              select: {
                room: {
                  select: { type: true },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json({ data: booking });
  } catch (error) {
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

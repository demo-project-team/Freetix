import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const putOrg = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {request} = req.body;
  try {
    await prisma.organization.update({
      where: {
        id,
      },
      data: {
        request: request as 'PENDING' | 'CANCELLED' | 'APPROVED',
      },
    });
    res.status(200).json({ succes: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', error1: error });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getOrg = async (req: Request, res: Response) => {
  try {
    const organiztion = await prisma.organization.findMany({});
    res.status(200).json({ succes: true, data: organiztion });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', error1: error });
  }
};

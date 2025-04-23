import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const existingOrg = async (req: Request, res: Response, next: NextFunction) => {
  const { OrganizationRegister } = req.body;

  try {
    const existingUser = await prisma.organization.findFirst({
      where: {
        OrganizationRegister
      },
    });

    if (existingUser) {
      res.status(409).json({ success: false, message: `${OrganizationRegister} already requested` });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorDetail: error });
    return;
  }
};

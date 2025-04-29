import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';

export const signUpOrg = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone, OrganizationRegister } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.organization.create({
      data: {
        name,
        email,
        passwordHash,
        phone,
        OrganizationRegister,
      },
    });
    res.status(200).json({ success: true, message: 'Sign-in successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};
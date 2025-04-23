import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';

export const signUpOrg = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone, OrganizationRegister } = req.body;
  console.log();
  
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.organization.create({
      data: {
        name,
        email,
        passwordHash,
        phone,
        OrganizationRegister
      },
    });
    const token = jwt.sign({ user: user }, '1234', { expiresIn: '8h' });
    res.status(200).json({ success: true, message: 'Sign-in successful', token: token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

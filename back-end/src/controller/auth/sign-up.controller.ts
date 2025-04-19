import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, phone, profileImage } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: username,
        email,
        passwordHash,
        phone,
        profileImage: profileImage || null,
      },
    });

    res.status(201).json({ success: true, message: 'User created' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};

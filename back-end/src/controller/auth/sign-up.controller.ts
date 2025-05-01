import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, phone, profileImage } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        passwordHash,
        phone,
        profileImage: profileImage || null,
      },
    });
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '8h' });
    res.cookie('user', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, message: 'Sign-in successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  } finally {
    prisma.$disconnect();
  }
};
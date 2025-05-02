import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { emailOrPhone, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    });
    if (!user || !user?.passwordHash) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '24h',
    });
    res.cookie('user', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, message: 'Sign-in successful' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  } finally {
    prisma.$disconnect();
  }
};
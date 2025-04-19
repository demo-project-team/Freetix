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
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ user: user }, '1234', { expiresIn: '8h' });
    res.status(200).json({ success: true, message: 'Sign-in successful', token: token });
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

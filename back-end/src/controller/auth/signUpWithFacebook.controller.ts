import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';

export const signUpFacebook = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || !user.displayName) {
      res.status(400).json({ user: user });
      return;
    }
    let existingUser = await prisma.user.findUnique({
      where: { name: user.displayName },
    });
    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          email: 'facebook uses',
          name: user.displayName,
        },
      });
    }
    const token = jwt.sign({ user: existingUser }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '24h',
    });
    res.cookie('user', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(process.env.FRONT_URL || 'http://localhost:3000');
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

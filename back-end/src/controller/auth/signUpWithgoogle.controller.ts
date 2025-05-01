import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';

export const loginGoogle = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || !user.displayName || !user.emails?.length) {
       res.status(400).json({ message: 'Invalid user data from Google' });
       return
    }
    const email = user.emails[0].value;
    let existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          email,
          name: user.displayName,
        },
      });
    }
    const token = jwt.sign(
      { user: existingUser.id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '24h' },
    );
    res.cookie('user', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect('https://freetix-ashy.vercel.app');
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

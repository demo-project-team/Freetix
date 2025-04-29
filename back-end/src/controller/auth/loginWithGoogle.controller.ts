import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';
export const loginGoogleDis = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || !user?.emails) {
      res.status(500).json({ message: 'user data is missing' });
      return;
    }
    const email = user.emails[0].value;
    const user1 = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user1) {
      res.status(400).json({ message: 'user not found' });
      return;
    }
    const token = jwt.sign({ user: user1 }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '24h',
    });
    res.cookie('user', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect('http://localhost:3000');
  } catch (error) {
    res.status(500).json({ error });
  }
};

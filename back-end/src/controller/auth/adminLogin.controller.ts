import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const admin = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ succes: true });
  } catch (error) {
    res.status(500).json({ error: error, message: 'Internal server error' });
  }
};
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user || !user.passwordHash) {
      res.status(400).json({ message: 'user not found' });
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
    res.cookie('admin', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({ succse: true }).status(200);
  } catch (error) {
    res.status(500).json({ error: error, message: 'Internal server error' });
  }
};

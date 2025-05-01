import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const getUserProfile = async (req: Request, res: Response) => {
  const token = req.cookies.user;
  if (!token) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as {
      user: { id: string; name: string };
    };
    res.status(200).json({ data: decoded.user });
  } catch (error) {
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

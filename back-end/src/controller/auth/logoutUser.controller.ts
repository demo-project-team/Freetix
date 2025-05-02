import { Request, Response } from 'express';

export const logoutUser = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
         res.status(500).json({ message: 'Logout failed' });
         return
      }
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });
      res.clearCookie('user', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });
      res.redirect(process.env.FRONT_URL ? `${process.env.FRONT_URL}` : 'http://localhost:3000');
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

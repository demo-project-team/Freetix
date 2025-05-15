/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user1: {
        id: string;
        email: string;
      };
    }
  }
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.admin;
  if (!token) {
    res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as {
      user: { id: string; email: string };
    };
    req.user1 = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error instanceof Error ? error.message : error,
    });
  }
};

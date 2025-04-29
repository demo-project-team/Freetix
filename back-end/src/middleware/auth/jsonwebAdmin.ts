import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user1: {
        id: string;
        email: string;
      };
    }
  }
}
export const jwtVerifyAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.org
  if (!token) {
    res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    return;
  }
  try {    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as {
      id: string;
      email: string;
    };
    req.user1 = decoded;
    next();
  } catch (error) {    
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error instanceof Error ? error.message : error,
    });
  }
};

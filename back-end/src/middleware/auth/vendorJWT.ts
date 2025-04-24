import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
      };
    }
  }
}
export const organizationToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    return;
  }
  try {
    const decoded = jwt.verify(token, '1234') as {
     user : {id:string, email:string}
    };
    req.user = decoded.user;
    console.log(decoded);
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error instanceof Error ? error.message : error,
    });
  }
};

import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const existingUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, phone } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { name: username }, { phone }],
      },
    });

    if (existingUser) {
      let field = 'email';
      if (existingUser.name === username) field = 'username';
      else if (existingUser.phone === phone) field = 'phone';

      res.status(409).json({ success: false, message: `${field} already in use` });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorDetail: error });
    return;
  }
};

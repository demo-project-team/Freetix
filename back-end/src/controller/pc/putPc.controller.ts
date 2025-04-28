import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const putPc = async (req: Request, res: Response) => {
  try {
    const rawIds = req.query.ids
    const { status } = req.body;
    if (typeof rawIds === 'string') {
      const ids = String(rawIds).split(',');
      if (!ids.length) {
        res.status(400).json({ message: 'Missing ids or status' });
        return;
      }

      const pc = await prisma.pC.updateMany({
        where: {
          id: {
            in: ids.map((id) => String(id)),
          },
        },
        data: {
          status,
        },
      });
      console.log(pc);

      res.status(200).json({ message: 'succes', pc });
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

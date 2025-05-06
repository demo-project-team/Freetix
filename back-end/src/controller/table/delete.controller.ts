import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const deleteTable = async (req: Request, res: Response) => {
  const { tableId } = req.params;
  try {
    const deletedTable = await prisma.pC.delete({
      where: {
        id: tableId,
      },
    });
    res.status(200).json({ deletedTable });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error, message: 'Internal server error' });
  }
} 
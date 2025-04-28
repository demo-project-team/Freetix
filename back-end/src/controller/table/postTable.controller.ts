import { Request, Response } from 'express';
import { prisma  } from '../../lib/prisma';

export const postTable = async (req: Request, res: Response) => {
  try {
    const roomId = req.params.roomId;
    const { col, row, name } = req.body;
    const table = await prisma.table.create({
      data: {
        name,
        room: {
          connect: {
            id: roomId,
          },
        },
      },
    });
    const pcsData = [];

    for (let r = 1; r <= row; r++) {
      for (let c = 1; c <= col; c++) {
        pcsData.push({
          name: `PC-${r}-${c}`, 
          tableId: table.id,
          row: r,
          column: c,
        });
      }
    }

     await prisma.pC.createMany({
      data: pcsData,
    });

    res.status(201).json({ table, pcsCreated: pcsData.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
export const putVendor = async (req: Request, res:Response) => {
    try {
        const id = req.params.id;
        const {name, email, imageUrl, phone, description} = req.body
        if (id) {
                const updated = await prisma.vendor.update({
                    where: {
                        id: id
                    },
                    data: {
                        name,
                        imageUrl,
                        phone,
                        email,
                        description,
                    }
                });
                res.status(200).json({updated})
            }
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Account not updated found"
        })
        console.log(error);
        
    }
}
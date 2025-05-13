import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';

export const signUpOrgMany = async (req: Request, res: Response): Promise<void> => {
  const { user } = req.body; 

  try {
    const hashedUsers = await Promise.all(
      user.map(async (userData: { password: string; email: string; name: string; phone: string; OrganizationRegister: string }) => {
        const passwordHash = await bcrypt.hash(userData.password, 10);
        return {
          email: userData.email,
          name: userData.name,
          passwordHash: passwordHash, 
          phone: userData.phone,
          OrganizationRegister: userData.OrganizationRegister
        };
      })
    );
    await prisma.organization.createMany({
      data: hashedUsers, 
    });

    res.status(200).json({ success: true, message: 'Sign-up successful for multiple users' });
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};

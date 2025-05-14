import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import "dotenv/config"

export const signInOrg = async (req: Request, res: Response): Promise<void> => {
  const { phoneOrOrganizationRegister, password } = req.body;
  try {
    const user = await prisma.organization.findFirst({
      where: {
        OR: [
          { phone: phoneOrOrganizationRegister },
          { OrganizationRegister: phoneOrOrganizationRegister },
          { email : phoneOrOrganizationRegister}
        ],
      },
    });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }
    if (user.request !== 'APPROVED') {
      res.status(401).json({ succes: false, message: 'not approved' });
      return;
    }
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '24h',
    });
    res.cookie('org', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, message: 'Sign-in successful', id: user.id });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  } finally {
    prisma.$disconnect();
  }
};
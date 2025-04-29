import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import nodemailer from 'nodemailer';
async function sendOTPEmail(email: string, message: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'uskhuunymdavaa9@gmail.com',
      pass: 'rnal apaa cdax boow',
    },
  });

  const mailOptions = {
    from: `"Freetix" <uskhuunymdavaa9@gmail.com>`,
    to: email,
    subject: 'Your Verification Code',
    html: `
      <div>
      your request ${message}
      </div>
     
      `,
  };

  return transporter.sendMail(mailOptions);
}
export const putOrg = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { request } = req.body;
  try {
    const org = await prisma.organization.update({
      where: {
        id,
      },
      data: {
        request: request as 'PENDING' | 'CANCELLED' | 'APPROVED',
      },
    });
    sendOTPEmail(org.email, org.request);
    res.status(200).json({ succes: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', error1: error });
  }
};

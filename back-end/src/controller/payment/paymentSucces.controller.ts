import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import nodemailer from 'nodemailer';
import 'dotenv/config';

async function sendEmail(email: string, message: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const mailOptions = {
    from: `"Freetix" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Төлбөр төлсөн баримт',
    html: `<div>${message}</div>`,
  };

  return transporter.sendMail(mailOptions);
}

export const paymentSuccess = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const payment = await prisma.payment.update({
      where: { id },
      data: {
        paidAt: new Date(),
        status: 'PAID',
        booking: {
          update: {
            status: 'CONFIRMED',
          },
        },
      },
      include: {
        booking: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
    await sendEmail(payment.booking.user.email, `${payment.amount}₮ төлбөр амжилттай.`);
    res.status(200).json({ data: payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

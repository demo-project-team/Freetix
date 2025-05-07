import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { Payment } from '@prisma/client';
import 'dotenv/config';

function generateReceiptPDF(payment: Payment, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text('Төлбөрийн баримт', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Төлбөрийн дугаар: ${payment.id}`);
    doc.text(`Огноо: ${new Date(payment.paidAt || new Date()).toLocaleString()}`);
    doc.text(`Төлбөр: ${payment.amount}₮`);
    doc.text(`Гүйлгээ: ${payment.transactionId}`);
    doc.text(`Захиалгын төлөв: CONFIRMED`);
    doc.moveDown();
    doc.text('Eslot-ийг сонгосонд баярлалаа!');

    doc.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

async function sendEmail(email: string, message: string, attachmentPath: string) {
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
    attachments: [
      {
        filename: 'receipt.pdf',
        path: attachmentPath,
      },
    ],
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
    const receiptsDir = path.join(__dirname, '../../receipts');
    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir, { recursive: true });
    }
    const pdfPath = path.join(receiptsDir, `receipt-${payment.id}.pdf`);
    await generateReceiptPDF(payment, pdfPath);
    await sendEmail(payment.booking.user.email, `${payment.amount}₮ төлбөр амжилттай.`, pdfPath);
    fs.unlink(pdfPath, (err) => {
      if (err) console.error("Failed to delete PDF:", err);
    });
    res.status(200).json({ data: payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

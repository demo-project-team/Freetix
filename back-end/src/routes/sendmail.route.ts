import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
export const MailRouter = express.Router();
async function sendOTPEmail(email: string) {
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
      your request accepted
      </div>
     
      `,
  };

  return transporter.sendMail(mailOptions);
}
MailRouter.post('/sentmail', async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    sendOTPEmail(email);
  } catch (error) {
    res.status(500).json({ error });
  }
});

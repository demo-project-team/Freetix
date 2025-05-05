import { Request, Response } from 'express';
import Stripe from 'stripe';
import 'dotenv/config';
import { prisma } from '../../lib/prisma';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const testStripe = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: 10000000,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.status(200).json({ clientSecret: payment.client_secret, payment });
    await prisma.payment.update({
      where: { id },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ error, message: 'Internal server error' });
  }
};

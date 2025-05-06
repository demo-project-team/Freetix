import express from "express";
import { paymentCallback } from "../controller/payment/socialPay.controller";
import { createInvoice } from "../controller/payment/socialPayToken.controller";
import { testStripe } from "../controller/payment/testPay.controller";
import { paymentSuccess } from "../controller/payment/paymentSucces.controller";

export const PaymentRouter = express.Router()
 PaymentRouter.post('/socialpay/callback', paymentCallback) 
 PaymentRouter.post('/socialpay', createInvoice)
 PaymentRouter.get('/stripe/:id', testStripe)
 PaymentRouter.post('/:id', paymentSuccess)


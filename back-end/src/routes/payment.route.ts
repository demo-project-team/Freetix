import express from "express";
import { paymentCallback } from "../controller/payment/socialPay.controller";
import { createInvoice } from "../controller/payment/socialPayToken.controller";
import { testStripe } from "../controller/payment/testPay.controller";

export const PaymentRouter = express.Router()
 PaymentRouter.post('/socialpay/callback', paymentCallback) 
 PaymentRouter.post('/socialpay', createInvoice)
 PaymentRouter.post('/stripe', testStripe)
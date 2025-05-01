import express from "express";
import { paymentCallback } from "../controller/payment/socialPay.controller";
import { createInvoice } from "../controller/payment/socialPayToken.controller";

export const PaymentRouter = express.Router()
 PaymentRouter.post('/socialpay/callback', paymentCallback) 
 PaymentRouter.post('/socialpay', createInvoice)
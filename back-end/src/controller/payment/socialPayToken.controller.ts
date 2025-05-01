import { Request, Response } from 'express';
import axios from 'axios';
import crypto from 'crypto';

const GOBANK_URL = 'https://ecommerce.golomtbank.com/api/confirmation';

function generateChecksum(
  transactionId: string,
  amount: string,
  returnType: string,
  callback: string
): string {
  const data = `${transactionId}${amount}${returnType}${callback}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { callbackUrl } = req.body;

    if (!callbackUrl) {
       res.status(400).json({ message: 'transactionId болон callbackUrl шаардлагатай.' });
       return
    }
    const transactionId = `txn_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const amount = ''; // Гүйлгээний дүн байхгүй тул хоосон
    const returnType = 'POST'; // Эсвэл таны сонголтоор 'GET'
    const checksum = generateChecksum(transactionId, amount, returnType, callbackUrl);

    const payload = {
      callback: callbackUrl,
      checksum,
      returnType,
      transactionId
    };

    const response = await axios.post(GOBANK_URL, payload);

     res.status(200).json({
      message: 'Invoice үүсгэлт амжилттай',
      data: response.data
    });
  } catch (error: any) {
    console.error('Invoice error:', error.response?.data || error.message);
     res.status(500).json({
      message: 'Нэхэмжлэх үүсгэхэд алдаа гарлаа',
      error: error.response?.data || error.message
    });
  }
};

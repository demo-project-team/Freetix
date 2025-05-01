import { Request, Response } from 'express';
import crypto from 'crypto';

export const paymentCallback = async (req: Request, res: Response) => {
  try {
    // Банкнаас ирэх data (GET эсвэл POST байдлаар ирж болно)
    const { invoice, transactionId, checksum } = req.method === 'GET' ? req.query : req.body;

    if (!invoice || !transactionId || !checksum) {
       res.status(400).json({ message: 'Бүрэн мэдээлэл ирсэнгүй.' });
       return
    }

    // Checksum шалгах
    const dataToCheck = `${invoice}${transactionId}`;
    const localChecksum = crypto.createHash('sha256').update(dataToCheck).digest('hex');

    const isValid = localChecksum === checksum;

    if (!isValid) {
      console.warn('⚠️ Checksum таарахгүй байна!');
       res.status(400).json({ message: 'Checksum баталгаажуулалт амжилтгүй.' });
       return
    }

    // TODO: Төлбөрийн статусыг хадгалах (DB-д тэмдэглэх гэх мэт)
    console.log('✅ Төлбөрийн баталгаажуулалт амжилттай!', {
      invoice,
      transactionId
    });

    // Хэрэглэгч рүү redirect хийх (optional)
    // res.redirect(`/payment-success?invoice=${invoice}&transactionId=${transactionId}`);

    // Эсвэл зүгээр амжилттай гэсэн JSON буцаах
     res.status(200).json({
      message: 'Төлбөрийн баталгаажуулалт амжилттай.',
      invoice,
      transactionId
    });

  } catch (error) {
    console.error('Callback error:', error);
     res.status(500).json({ message: 'Дотоод алдаа.', error: error });
  }
};

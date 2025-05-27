import { Request, Response } from 'express';
import { PaymentModel } from '@/models/payments';


const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentModel.findById(req.params.id)
      .populate('orderId')
      .populate('userId');

    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    res.json(payment);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching payment', error: err.message });
  }
};

export default getPaymentById;
import { Request, Response } from 'express';
import { OrderModel } from '@/models/order';
import { TransactionModel } from '@/models/payments/transactions';

const createPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentMethod, amount } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }
    const userId = req.user.id;

    const order = await OrderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const payment = await TransactionModel.create({
      id: `txn_${Date.now()}`,
      customer: userId,
      customerId: userId,
      amount,
      currency: 'EUR',
      paymentMethod,
      status: 'pending',
      date: new Date(),
      description: `Payment for order ${orderId}`,
    });

    // Simulate success
    payment.status = 'completed';
    await payment.save();

    // Update order status to paid
    order.status = 'paid';
    order.paymentMethod = paymentMethod;
    await order.save();

    res.status(201).json({ message: 'Payment completed', payment });
  } catch (err: any) {
    res.status(500).json({ message: 'Payment error', error: err.message });
  }
};

export default createPayment;

import { Request, Response } from 'express';
import { sendSMS } from '@/services/SMS'; // assuming you have an SMS service set up

const sendOrderConfirmationSMS = async (req: Request, res: Response) => {
  const { phoneNumber, orderId } = req.body;

  const message = `Your order #${orderId} has been confirmed. Thank you for shopping with us!`;

  try {
    await sendSMS(phoneNumber, message);
    res.status(200).json({ message: 'Order confirmation SMS sent' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ message: 'Failed to send SMS' });
  }
};

export default sendOrderConfirmationSMS;
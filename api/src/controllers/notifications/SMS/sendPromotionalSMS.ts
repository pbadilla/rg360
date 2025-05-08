import { Request, Response } from 'express';
import { sendSMS } from '@/services/SMS'; // assuming you have an SMS service set up

const sendPromotionalSMS = async (req: Request, res: Response) => {
  const { phoneNumber, promotionDetails } = req.body;

  const message = `Special Offer! ${promotionDetails}. Don't miss out!`;

  try {
    await sendSMS(phoneNumber, message);
    res.status(200).json({ message: 'Promotional SMS sent' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ message: 'Failed to send SMS' });
  }
};

export default sendPromotionalSMS;

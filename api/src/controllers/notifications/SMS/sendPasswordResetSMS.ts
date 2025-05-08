import { Request, Response } from 'express';
import { sendSMS } from '@/services/SMS'; // assuming you have an SMS service set up

const sendPasswordResetSMS = async (req: Request, res: Response) => {
  const { phoneNumber, resetToken } = req.body;

  const message = `Password reset token: ${resetToken}. Use it within 15 minutes to reset your password.`;

  try {
    await sendSMS(phoneNumber, message);
    res.status(200).json({ message: 'Password reset SMS sent' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ message: 'Failed to send SMS' });
  }
};
export default sendPasswordResetSMS;

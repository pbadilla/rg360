import { Request, Response } from 'express';
import { sendEmail } from '@/services/mailer'; // 

const sendPromotionalEmail = async (req: Request, res: Response) => {
  const { email, promotionDetails } = req.body;

  const htmlContent = `
    <h3>Special Offer Just for You!</h3>
    <p>Don't miss out on this great deal:</p>
    <p>${promotionDetails}</p>
  `;

  try {
    await sendEmail(email, 'Special Offer', htmlContent);
    res.status(200).json({ message: 'Promotional email sent' });
  } catch (error) {
    console.error('Error sending promotional email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

export default sendPromotionalEmail;
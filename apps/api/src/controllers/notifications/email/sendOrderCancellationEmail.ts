import { Request, Response } from 'express';
import { sendEmail } from '@/services/mailer'; // 

const sendOrderCancellationEmail = async (req: Request, res: Response) => {
  const { email, orderId } = req.body;
  const htmlContent = `
    <h2>Order Cancellation</h2>
    <p>We're sorry to inform you that your order has been cancelled.</p>
    <p>Order ID: ${orderId}</p>
    <p>If you have any questions, please contact our support team.</p>
  `;
  try {
    await sendEmail(email, 'Order Cancellation', htmlContent); 
    res.status(200).json({ message: 'Order cancellation email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};
export default sendOrderCancellationEmail;
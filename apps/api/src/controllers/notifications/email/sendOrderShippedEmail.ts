import { Request, Response } from 'express';
import { sendEmail } from '@/services/mailer'; // assuming mailer service is set up


const sendOrderShippedEmail = async (req: Request, res: Response) => {
  const { email, orderId, trackingNumber } = req.body;

  const htmlContent = `
    <h2>Your Order Has Shipped!</h2>
    <p>Order ID: ${orderId}</p>
    <p>Tracking Number: ${trackingNumber}</p>
    <p>You can track your order <a href="https://trackinglink.com/${trackingNumber}">here</a>.</p>
  `;

  try {
    await sendEmail(email, 'Order Shipped', htmlContent);
    res.status(200).json({ message: 'Order shipped email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

export default sendOrderShippedEmail;

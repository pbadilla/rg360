import { Request, Response } from 'express';
import { sendEmail } from '@/services/mailer'; // assuming mailer service is set up

const sendOrderConfirmationEmail = async (req: Request, res: Response) => {
  const { email, orderId, orderDetails } = req.body;

  const htmlContent = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your order!</p>
    <p>Order ID: ${orderId}</p>
    <h4>Order Details:</h4>
    <ul>
      ${orderDetails.map((item: any) => `<li>${item.productName} - ${item.quantity}</li>`).join('')}
    </ul>
    <p>We will notify you once your order is shipped.</p>
  `;

  try {
    await sendEmail(email, 'Order Confirmation', htmlContent);
    res.status(200).json({ message: 'Order confirmation email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

export default sendOrderConfirmationEmail;

import { Request, Response } from 'express';
import { sendEmail } from '@/services/mailer'; // 

const sendPasswordResetEmail = async (req: Request, res: Response) => {
  const { email, resetToken } = req.body;

  const resetUrl = `https://yourapp.com/reset-password?token=${resetToken}`;
  const htmlContent = `
    <h3>Password Reset</h3>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>This link will expire in 15 minutes.</p>
  `;

  try {
    await sendEmail(email, 'Password Reset Request', htmlContent);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};
export default sendPasswordResetEmail
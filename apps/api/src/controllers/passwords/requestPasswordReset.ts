// controllers/requestPasswordReset.ts
import { Request, Response } from 'express';
import crypto from 'crypto';
import { UserModel } from '@/models/user';
import { PasswordResetTokenModel } from '@/models/passwordResetToken';
import { sendEmail } from '@/services/mailer';

const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

  await PasswordResetTokenModel.create({ userId: user._id, token, expiresAt });

  const resetUrl = `https://yourapp.com/reset-password?token=${token}`;
  const html = `
    <h3>Password Reset</h3>
    <p>Hello ${user.name || 'user'},</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>This link will expire in 15 minutes.</p>
  `;

  await sendEmail(user.email, 'Password Reset Request', html);

  res.json({ message: 'Reset email sent. Please check your inbox.' });
};

export default requestPasswordReset;

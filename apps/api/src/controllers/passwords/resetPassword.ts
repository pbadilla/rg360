import { Request, Response } from 'express';
import { PasswordResetTokenModel } from '@/models/passwordResetToken';
import { UserModel } from '@/models/user';
import bcrypt from 'bcrypt';

const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const resetEntry = await PasswordResetTokenModel.findOne({ token });
  if (!resetEntry || resetEntry.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await UserModel.findByIdAndUpdate(resetEntry.userId, { passwordHash: hashed });
  await PasswordResetTokenModel.deleteOne({ _id: resetEntry._id });

  res.json({ message: 'Password reset successful' });
};

export default resetPassword;

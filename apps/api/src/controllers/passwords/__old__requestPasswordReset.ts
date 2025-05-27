// controllers/requestPasswordReset.ts
import { Request, Response } from 'express';
import crypto from 'crypto';
import { UserModel } from '@/models/user';
import { PasswordResetTokenModel } from '@/models/passwordResetToken';

const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 mins

  await PasswordResetTokenModel.create({ userId: user._id, token, expiresAt });

  // In real apps: email this token (or reset link) to the user
  res.json({ message: 'Password reset token created', token });
};

export default requestPasswordReset;

// Uncomment the following code if you want to implement the rest of the password reset functionality
// export const verifyPasswordResetToken = async (req: Request, res: Response) => {
//   const { token } = req.params;
//   const passwordResetToken = await PasswordResetTokenModel.findOne({ token });
//   if (!passwordResetToken) return res.status(404).json({ message: 'Invalid or expired token' });
//   if (passwordResetToken.expiresAt < new Date()) {
//     await PasswordResetTokenModel.deleteMany({ token });
//     return res.status(410).json({ message: 'Token expired' });
//   }
//   res.json({ message: 'Token is valid', userId: passwordResetToken.userId });
// };
// export const resetPassword = async (req: Request, res: Response) => {
//   const { userId, newPassword } = req.body;
//   const passwordResetToken = await PasswordResetTokenModel.findOne({ userId });
//   if (!passwordResetToken) return res.status(404).json({ message: 'Invalid or expired token' });
//   if (passwordResetToken.expiresAt < new Date()) {
//     await PasswordResetTokenModel.deleteMany({ userId });
//     return res.status(410).json({ message: 'Token expired' });
//   }
//   const hashedPassword = await UserModel.hashPassword(newPassword);
//   await UserModel.findByIdAndUpdate(userId, { passwordHash: hashedPassword });
//   await PasswordResetTokenModel.deleteMany({ userId });
//   res.json({ message: 'Password reset successfully' });
// };
// export const deletePasswordResetToken = async (req: Request, res: Response) => {
//   const { token } = req.params;
//   const result = await PasswordResetTokenModel.deleteMany({ token });
//   if (result.deletedCount === 0) return res.status(404).json({ message: 'Token not found' });
//   res.json({ message: 'Token deleted' });
// };
// export const deletePasswordResetTokensByUserId = async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const result = await PasswordResetTokenModel.deleteMany({ userId });
//   if (result.deletedCount === 0) return res.status(404).json({ message: 'Tokens not found' });
//   res.json({ message: 'Tokens deleted' });
// };
// export const deleteExpiredPasswordResetTokens = async (req: Request, res: Response) => {
//   const result = await PasswordResetTokenModel.deleteMany({ expiresAt: { $lt: new Date() } });
//   if (result.deletedCount === 0) return res.status(404).json({ message: 'No expired tokens found' });
//   res.json({ message: 'Expired tokens deleted' });
// }
// export const deleteAllPasswordResetTokens = async (req: Request, res: Response) => {
//   const result = await PasswordResetTokenModel.deleteMany({});
//   if (result.deletedCount === 0) return res.status(404).json({ message: 'No tokens found' });
//   res.json({ message: 'All tokens deleted' });
// }
// export const getPasswordResetTokenById = async (req: Request, res: Response) => {
//   const { tokenId } = req.params;
//   const passwordResetToken = await PasswordResetTokenModel.findById(tokenId);
//   if (!passwordResetToken) return res.status(404).json({ message: 'Token not found' });
//   res.json({ passwordResetToken });
// }
// export const getPasswordResetTokensByUserId = async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const passwordResetTokens = await PasswordResetTokenModel.find({ userId });
//   if (!passwordResetTokens) return res.status(404).json({ message: 'Tokens not found' });
//   res.json({ passwordResetTokens });
// }
// export const getPasswordResetTokens = async (req: Request, res: Response) => {
//   const passwordResetTokens = await PasswordResetTokenModel.find();
//   if (!passwordResetTokens) return res.status(404).json({ message: 'Tokens not found' });
//   res.json({ passwordResetTokens });
// }
// export const getPasswordResetTokenByToken = async (req: Request, res: Response) => {
//   const { token } = req.params;
//   const passwordResetToken = await PasswordResetTokenModel.findOne({ token });
//   if (!passwordResetToken) return res.status(404).json({ message: 'Token not found' });
//   res.json({ passwordResetToken });
// }
// export const getPasswordResetTokensByToken = async (req: Request, res: Response) => {
//   const { token } = req.params;
//   const passwordResetTokens = await PasswordResetTokenModel.find({ token });
//   if (!passwordResetTokens) return res.status(404).json({ message: 'Tokens not found' });
//   res.json({ passwordResetTokens });
// }
// export const getPasswordResetTokensByUserIdAndToken = async (req: Request, res: Response) => {
//   const { userId, token } = req.params;
//   const passwordResetTokens = await PasswordResetTokenModel.find({ userId, token });
//   if (!passwordResetTokens) return res.status(404).json({ message: 'Tokens not found' });
//   res.json({ passwordResetTokens });
// }
// export const getPasswordResetTokensByUserIdAndTokenAndExpiresAt = async (req: Request, res: Response) => {
//   const { userId, token, expiresAt } = req.params;
//   const passwordResetTokens = await PasswordResetTokenModel.find({ userId, token, expiresAt });
//   if (!passwordResetTokens) return res.status(404).json({ message: 'Tokens not found' });
//   res.json({ passwordResetTokens });
// }
// export const getPasswordResetTokensByUserIdAndTokenAndExpiresAtAndCreatedAt = async (req: Request, res: Response) => {
//   const { userId, token, expiresAt, createdAt } = req.params;
//   const passwordResetTokens = await PasswordResetTokenModel.find({ userId, token, expiresAt, createdAt });
//   if (!passwordResetTokens) return res.status(404).json({ message: 'Tokens not found' });
//   res.json({ passwordResetTokens });
// }
import { Request, Response } from 'express';
import { UserModel } from '@/models/user';

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default getUserById;

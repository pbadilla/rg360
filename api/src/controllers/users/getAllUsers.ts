import { Request, Response } from 'express';
import { UserModel } from '@/models/user';

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select('-passwordHash');
    res.status(200).json({ users });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default getAllUsers;

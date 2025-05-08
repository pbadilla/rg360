import { Request, Response } from 'express';
import { UserModel } from '@/models/user';

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const result = await UserModel.findByIdAndDelete(req.params.userId);
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteUserById;

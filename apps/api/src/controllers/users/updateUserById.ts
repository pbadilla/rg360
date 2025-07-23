import { Request, Response } from 'express';
import { UserModel } from '@/models/user';

const updateUserById = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const updated = await UserModel.findByIdAndUpdate(req.params.userId, updates, {
      new: true
    }).select('-passwordHash');

    if (!updated) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user: updated });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default updateUserById;

import { Request, Response } from 'express';
import { UserModel } from '@/models/user';
import bcrypt from 'bcrypt';

const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, addresses } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, passwordHash, phone, addresses });

    const saved = await user.save();
    res.status(201).json({ user: saved });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default addUser;
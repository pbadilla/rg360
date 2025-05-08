import { Request, Response } from 'express';
import { UserModel } from '@/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '7d'
    });

    res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default loginUser;
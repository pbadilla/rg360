import { Request, Response } from 'express';
import { ShippingModel } from '@/models/shipping';
import { AuthenticatedRequest } from '@/middleware/auth';

const getShipping = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const shipping = await ShippingModel.find({ userId: req.user.id });
    res.json(shipping || null);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching shipping info', error: err.message });
  }
};
export default getShipping;

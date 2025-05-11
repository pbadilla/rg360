import { Request, Response } from 'express';
import { ShippingModel } from '@/models/shipping';
import { AuthenticatedRequest } from '@/middleware/auth';

const getShipping = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const shipping = await ShippingModel.findOne({ userId: req.user._id });
    res.json(shipping || null);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching shipping info', error: err.message });
  }
};
export default getShipping;

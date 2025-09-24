import { Response } from 'express';
import { ShippingModel } from '@/models/shipping';
import { AuthenticatedRequest } from '@/middleware/auth';

const deleteShipping = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.id;
    await ShippingModel.deleteOne({ userId });
    res.status(200).json({ message: 'Shipping info deleted' });
  } catch (err: any) {
    res.status(500).json({ message: 'Error deleting shipping info', error: err.message });
  }
};
export default deleteShipping;

import { Request, Response } from 'express';
import { ShippingModel } from '@/models/shipping';
import { AuthenticatedRequest } from '@/middleware/auth';

const saveOrUpdateShipping = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { address, phone } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const userId = req.user.id;

    const updated = await ShippingModel.findOneAndUpdate(
      { userId },
      { address, phone },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Shipping info saved', shipping: updated });
  } catch (err: any) {
    res.status(500).json({ message: 'Error saving shipping info', error: err.message });
  }
};

export default saveOrUpdateShipping;

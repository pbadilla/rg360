import { Response } from 'express';
import { ShippingModel } from '@/models/shipping';
import { AuthenticatedRequest } from '@/middleware/auth';

const addShipping = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { address, phone } = req.body;
    const userId = req.user._id;
    const shipping = new ShippingModel({
      userId,
      address: {
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        zip: address.zip,
        country: address.country
      },
      phone
    });
    await shipping.save();
    res.status(201).json({ message: 'Shipping info added', shipping });
  } catch (err: any) {
    res.status(500).json({ message: 'Error adding shipping info', error: err.message });
  }
};

export default addShipping;

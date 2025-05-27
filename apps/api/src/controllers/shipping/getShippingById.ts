import { Request, Response } from 'express';
import { ShippingModel } from '@/models/shipping';

const getShippingById = async (req: Request, res: Response) => {
  try {
    const shippingId = req.params.id;
    const shipping = await ShippingModel.findById(shippingId);
    if (!shipping) {
      return res.status(404).json({ message: 'Shipping info not found' });
    }
    res.status(200).json(shipping);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching shipping info', error: err.message });
  }
};
export default getShippingById;

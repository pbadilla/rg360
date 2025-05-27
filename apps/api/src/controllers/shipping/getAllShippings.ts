import { Response } from 'express';
import { ShippingModel } from '@/models/shipping';

const getAllShippings = async (res: Response) => {
  try {
    const shippings = await ShippingModel.find();
    res.status(200).json(shippings);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching shipping info', error: err.message });
  }
}
export default getAllShippings;

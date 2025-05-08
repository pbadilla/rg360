import { Request, Response } from 'express';
import { VendorModel } from '@/models/vendor';

const createVendor = async (req: Request, res: Response) => {
  try {
    const vendor = new VendorModel(req.body);
    await vendor.save();
    res.status(201).json({ vendor });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create vendor', error: error.message });
  }
};

export default createVendor;

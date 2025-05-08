import { Request, Response } from 'express';
import { VendorModel } from '@/models/vendor';

const getAllVendors = async (_req: Request, res: Response) => {
  try {
    const vendors = await VendorModel.find();
    res.status(200).json({ vendors });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch vendors', error: error.message });
  }
};

export default getAllVendors;

import { Request, Response } from 'express';
import { VendorModel } from '@/models/vendor';

const getVendorById = async (req: Request, res: Response) => {
  try {
    const { vendorId } = req.params;
    const vendor = await VendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json({ vendor });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch vendor', error: error.message });
  }
};

export default getVendorById;

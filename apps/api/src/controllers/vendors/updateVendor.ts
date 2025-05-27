import { Request, Response } from 'express';
import { VendorModel } from '@/models/vendor';

const updateVendor = async (req: Request, res: Response) => {
  try {
    const { vendorId } = req.params;
    const updatedVendor = await VendorModel.findByIdAndUpdate(vendorId, req.body, {
      new: true,
    });
    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json({ vendor: updatedVendor });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update vendor', error: error.message });
  }
};

export default updateVendor;

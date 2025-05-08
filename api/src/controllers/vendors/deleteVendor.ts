import { Request, Response } from 'express';
import { VendorModel } from '@/models/vendor';

const deleteVendor = async (req: Request, res: Response) => {
  try {
    const { vendorId } = req.params;
    const deletedVendor = await VendorModel.findByIdAndDelete(vendorId);
    if (!deletedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json({ message: 'Vendor deleted' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete vendor', error: error.message });
  }
};

export default deleteVendor;
import { Router } from 'express';
import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} from '@/controllers/vendors';

const router = Router();

router.post('/', createVendor);
router.get('/', getAllVendors);
router.get('/:vendorId', getVendorById);
router.put('/:vendorId', updateVendor);
router.delete('/:vendorId', deleteVendor);

export default router;
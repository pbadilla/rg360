import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  addCarrier,
  deleteAllCarrier,
  deleteCarrierById,
  getAllCarriers,
  getCarrierById,
  updateCarrierById
} from '@/controllers/carriers';

const router = Router();

/** Middleware to check DB connection */
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Service Unavailable. Database not connected.' });
  }
  next();
});

/** carriers Routes */
/** CRUD Routes */
router.post('/', addCarrier);
router.get('/', getAllCarriers);
router.get('/:carrierId', getCarrierById);
router.delete('/', deleteAllCarrier);
router.delete('/:carrierId', deleteCarrierById);

router.patch('/:carrierId', updateCarrierById);

export default router;
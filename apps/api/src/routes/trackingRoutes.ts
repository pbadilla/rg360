import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  addTracking,
  deleteAllTracking,
  deleteTrackingById,
  getAllTracking,
  getTrackingById,
  updateTrackingById
} from '@/controllers/tracking';

const router = Router();

/** Middleware to check DB connection */
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Service Unavailable. Database not connected.' });
  }
  next();
});

/** promotions Routes */
/** CRUD Routes */
router.post('/', addTracking);
router.get('/', getAllTracking);
router.get('/:trackingId', getTrackingById);
router.delete('/', deleteAllTracking);
router.delete('/:trackingId', deleteTrackingById);

router.patch('/:trackingId', updateTrackingById);

export default router;
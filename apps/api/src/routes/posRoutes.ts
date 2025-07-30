import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  addPOSProduct,
  deleteAllPOSProducts,
  deletePOSProductById,
  getAllPOSProducts,
  getPOSProductById,
  updatePOSProductById
} from '@/controllers/pos';

const router = Router();

/** Middleware to check DB connection */
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Service Unavailable. Database not connected.' });
  }
  next();
});

/** stock Routes */
/** CRUD Routes */
router.post('/', addPOSProduct);
router.get('/', getAllPOSProducts);
router.get('/:stockId', getPOSProductById);
router.delete('/', deleteAllPOSProducts);
router.delete('/:stockId', deletePOSProductById);

router.patch('/:stockId', updatePOSProductById);

export default router;
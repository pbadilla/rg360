import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  addSales,
  deleteAllSales,
  deleteSalesById,
  getAllSales,
  getSalesById,
  updateSalesById
} from '@/controllers/sales';

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
router.post('/', addSales);
router.get('/', getAllSales);
router.get('/:salesId', getSalesById);
router.delete('/', deleteAllSales);
router.delete('/:salesId', deleteSalesById);

router.patch('/:salesId', updateSalesById);

export default router;
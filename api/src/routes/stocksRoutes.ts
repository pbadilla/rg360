import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  getAllStocksProducts,
  getStockProductById,
  deleteStockProductById,
  addStockProduct
} from '@/controllers/stocks';

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
router.post('/', addStockProduct);
router.get('/', getAllStocksProducts);
router.get('/:stocksId', getStockProductById);
router.delete('/', deleteStockProductById);

export default router;

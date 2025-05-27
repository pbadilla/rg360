import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  addStockProduct,
  deleteAllStockProducts,
  deleteStockProductById,
  getAllStocksProducts,
  getStockProductById,
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
router.get('/:stockId', getStockProductById);
router.delete('/', deleteAllStockProducts);
router.delete('/:stockId', deleteStockProductById);

export default router;

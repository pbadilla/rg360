import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  getAllStocksProducts,
  getStockProductById,
  deleteAllStockProductById,
  deleteStockProductById,
  addStockProduct
} from '@/controllers/inventory';

const router = Router();

/** Middleware to check DB connection */
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Service Unavailable. Database not connected.' });
  }
  next();
});

/** Inventory Routes */
/** CRUD Routes */
router.post('/', addStockProduct);
router.get('/', getAllStocksProducts);
router.get('/:inventoryId', getStockProductById);
router.delete('/', deleteAllStockProductById);
router.delete('/:inventoryId', deleteStockProductById);

export default router;

import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  getAllInventoryProducts,
  getInventoryProductById,
  deleteAllInventoryProducts,
  deleteInventoryProductById,
  addInventoryProduct
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
router.post('/', addInventoryProduct);
router.get('/', getAllInventoryProducts);
router.get('/:inventoryId', getInventoryProductById);
router.delete('/', deleteAllInventoryProducts);
router.delete('/:inventoryId', deleteInventoryProductById);

export default router;

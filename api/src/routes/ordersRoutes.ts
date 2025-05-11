import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  getAllOrders,
  getOrderById,
  deleteAllOrders,
  deleteOrderById,
  addOrder
} from '@/controllers/orders';

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
router.post('/', addOrder);
router.get('/', getAllOrders);
router.get('/:inventoryId', getOrderById);
router.delete('/', deleteAllOrders);
router.delete('/:inventoryId', deleteOrderById);

export default router;

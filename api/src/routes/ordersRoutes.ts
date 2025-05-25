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

/** stock Routes */
/** CRUD Routes */
router.post('/', addOrder);
router.get('/', getAllOrders);
router.get('/:stockId', getOrderById);
router.delete('/', deleteAllOrders);
router.delete('/:stockId', deleteOrderById);

export default router;

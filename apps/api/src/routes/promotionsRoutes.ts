import { Router } from 'express';
import mongoose from 'mongoose';

import { 
  addPromotions,
  deleteAllPromotions,
  deletePromotionsById,
  getAllPromotions,
  getPromotionsById,
  updatePromotionsById
} from '@/controllers/promotions';

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
router.post('/', addPromotions);
router.get('/', getAllPromotions);
router.get('/:promotionsId', getPromotionsById);
router.delete('/', deleteAllPromotions);
router.delete('/:promotionsId', deletePromotionsById);

router.patch('/:promotionsId', updatePromotionsById);

export default router;
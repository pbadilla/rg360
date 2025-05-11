import express from 'express';
import { 
  addShipping,
  deleteShipping,
  getAllShippings,
  getShippingById,
  getShippingByUserId,
  getShipping, 
  saveOrUpdateShipping, 
} from '@/controllers/shipping';
import { authMiddleware } from '@/middleware/auth';

const router = express.Router();

router.delete('/', authMiddleware, deleteShipping);

router.get('/', authMiddleware, getShipping);
router.get('/:shippingId', authMiddleware, getShippingById);
router.get('/shippings', authMiddleware, getAllShippings);
router.get('/user/:userId', authMiddleware, getShippingByUserId);

router.post('/updateShipping', authMiddleware, saveOrUpdateShipping);
router.post('/addShipping', authMiddleware, addShipping);

export default router;
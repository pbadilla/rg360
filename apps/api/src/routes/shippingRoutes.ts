import express from 'express';
import { 
  addShipping,
  deleteShipping,
  getAllShippings,
  getShippingById,
  getShippingByUserId,
  saveOrUpdateShipping,
  updateShippingById
} from '@/controllers/shipping';

const router = express.Router();

router.delete('/', deleteShipping);

router.get('/:shippingId', getShippingById);
router.get('/', getAllShippings);
router.get('/user/:userId', getShippingByUserId);

router.post('/updateShipping', saveOrUpdateShipping);
router.post('/addShipping', addShipping);

router.patch('/:shippingId', updateShippingById);

export default router;
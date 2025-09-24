import express, { RequestHandler } from 'express';
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

router.delete('/', deleteShipping as RequestHandler);

router.get('/:shippingId', getShippingById);
router.get('/', getAllShippings);
router.get('/user/:userId', getShippingByUserId);

router.post('/updateShipping', saveOrUpdateShipping as RequestHandler);
router.post('/addShipping', addShipping as RequestHandler);

router.patch('/:shippingId', updateShippingById as RequestHandler);

export default router;
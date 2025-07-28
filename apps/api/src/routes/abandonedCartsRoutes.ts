import express from 'express';

import deleteAllAbandonedCarts from '@/controllers/abandonedCarts/deleteAllAbandonedCarts';
import getAllAbandonedCarts from '@/controllers/abandonedCarts/getAllAbandonedCarts';

const router = express.Router();

// router.post('/:id', addAbandonedCartById);
// router.delete('/:id', deleteAbandonedCartById);

// router.get('/:id', getAbandonedCartById);
// router.patch('/:id', updateAbandonedCartById);
router.get('/', getAllAbandonedCarts);
router.delete('/', deleteAllAbandonedCarts);

export default router;

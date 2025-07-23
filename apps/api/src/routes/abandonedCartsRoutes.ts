import express from 'express';

import getAllAbandonedCarts from '@/controllers/abandonedCarts/getAllAbandonedCarts';

const router = express.Router();

// router.post('/:id', addAbandonedCartById);
// router.delete('/:id', deleteAbandonedCartById);
// router.delete('/', deleteAllAbandonedCarts);
// router.get('/:id', getAbandonedCartById);
// router.patch('/:id', updateAbandonedCartById);
router.get('/', getAllAbandonedCarts);


export default router;

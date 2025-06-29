import express from 'express';

import getAllAbandonedCarts from '@/controllers/abandonedCarts/getAllAbandonedCarts';

const router = express.Router();

// router.post('/:id', addCategoryById);
// router.delete('/:id', deleteCategoryById);
// router.delete('/', deleteAllCategories);
// router.get('/:id', getCategoryById);
router.get('/', getAllAbandonedCarts);


export default router;

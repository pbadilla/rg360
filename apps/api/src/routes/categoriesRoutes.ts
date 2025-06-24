import express from 'express';
import addCategoryById from '@/controllers/categories/addCategory';
import deleteCategoryById from '@/controllers/categories/deleteCategoryById';
import deleteAllCategories from '@/controllers/categories/deleteAllCategories';
import getAllCategories from '@/controllers/categories/getAllCategories';
import getCategoryById from '@/controllers/categories/getCategoryById';

const router = express.Router();

router.post('/:id', addCategoryById);
router.delete('/:id', deleteCategoryById);
router.delete('/', deleteAllCategories);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

export default router;

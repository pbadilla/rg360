import express from 'express';
import {
  addCategory,
  deleteCategoryById,
  deleteAllCategories,
  getAllCategories,
  getCategoryById,
  updateExistingCategoryById
} from '@/controllers/categories';

const router = express.Router();

router.delete('/', deleteAllCategories);
router.get('/', getAllCategories);

router.post('/:category/:subcategory/:item', addCategory);
router.patch('/:category/:subcategory/:item', updateExistingCategoryById);
router.delete('/:category/:subcategory/:item', deleteCategoryById);
router.get('/:category/:subcategory/:item', getCategoryById);

router.get('/:category/:subcategory', getCategoryById);
router.patch('/:category/:subcategory', updateExistingCategoryById);
router.delete('/:category/:subcategory', deleteCategoryById);

router.get('/:category', getCategoryById);
router.patch('/:category', updateExistingCategoryById);
router.delete('/:category', deleteCategoryById);

export default router;

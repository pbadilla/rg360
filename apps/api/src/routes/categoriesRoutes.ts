import express from 'express';
import addCategoryById from '@/controllers/categories/addCategory';
import deleteCategoryById from '@/controllers/categories/deleteCategoryById';
import deleteAllCategories from '@/controllers/categories/deleteAllCategories';
import getAllCategories from '@/controllers/categories/getAllCategories';
import getCategoryById from '@/controllers/categories/getCategoryById';
import updateExistingCategoryById from '@/controllers/categories/updateExistingCategoryById';

const router = express.Router();

// Rutas específicas primero (orden importante)
router.delete('/', deleteAllCategories);
router.get('/', getAllCategories);

// Rutas para niveles específicos (más específicas primero)
// Para acceder a items específicos: /skates/accessories/custom-kits
router.post('/:category/:subcategory/:item', addCategoryById);
router.patch('/:category/:subcategory/:item', updateExistingCategoryById);
router.delete('/:category/:subcategory/:item', deleteCategoryById);
router.get('/:category/:subcategory/:item', getCategoryById);

// Para acceder a subcategorías: /skates/accessories
router.get('/:category/:subcategory', getCategoryById);
router.patch('/:category/:subcategory', updateExistingCategoryById);
router.delete('/:category/:subcategory', deleteCategoryById);

// Para acceder a categorías principales: /skates
router.get('/:category', getCategoryById);
router.patch('/:category', updateExistingCategoryById);
router.delete('/:category', deleteCategoryById);

export default router;
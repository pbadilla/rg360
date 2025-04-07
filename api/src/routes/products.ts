import { Router } from 'express';
import productController from '../controllers/productController';

const router = Router();

// Route to add a new product
router.post('/products', productController.addProduct);

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to get a product by ID
router.get('/products/:productId', productController.getProductById);

// Route to delete all products
router.delete('/products', productController.deleteAllProducts);

// Route to delete a product by ID
router.delete('/products/:productId', productController.deleteProductById);

export default router;
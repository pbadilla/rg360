import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

import {
  addProduct,
  getAllProducts,
  getAllProductsGrouped,
  getProductById,
  deleteAllProducts,
  deleteProductById,
  updateProductById
} from '@/controllers/products';

import { generateDescription } from '@/services/aiDescription';
import { Product } from '@/types/product';

import groupProductsByField from '@/controllers/products/groupProductsByField';

const router = Router();

/** Middleware para verificar conexión DB */
router.use((req, res, next) => {
  const readyState = mongoose.connection.readyState;
  console.log('Mongoose readyState:', readyState);

  if (readyState !== 1) {
    return res.status(503).json({
      message: 'Service Unavailable. Database not connected.'
    });
  }

  next();
});

/** Ruta para generar descripción con IA */
router.post('/product', async (req: Request, res: Response) => {
  try {
    const product: Product = {
      ...req.body,
      createdAt: new Date(),
    };

    const description = await generateDescription(product);
    res.json({ ...product, description });
  } catch (error: any) {
    console.error('Error generating description:', error.message);
    res.status(500).json({ error: 'Failed to generate product description' });
  }
});

/** Rutas específicas deben ir antes de las dinámicas */
// http://localhost:3000/products?page=1&limit=20&brand=Zara&category=ropa&stock=true&sort=price&order=asc
// GET /?page=1&limit=20&brand=Zara&sort=price&order=desc
router.get('/', getAllProducts);
router.get('/grouped', getAllProductsGrouped);
router.get('/group-by/:field', groupProductsByField);
router.post('/', addProduct);
router.patch('/:id', updateProductById);
router.get('/:productId', getProductById);
router.delete('/:productId', deleteProductById);
router.delete('/', deleteAllProducts);

export default router;

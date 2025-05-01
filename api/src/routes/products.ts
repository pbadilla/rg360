import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

import {
  addProduct,
  getAllProducts,
  getProductById,
  deleteAllProducts,
  deleteProductById
} from '@/controllers/products';

import { generateDescription } from '@/services/aiDescription';
import { Product } from '@/types/product';

const router = Router();

/** Middleware to check DB connection */
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

/** Route to generate AI description */
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

/** CRUD Product Routes */
router.post('/', addProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.delete('/', deleteAllProducts);
router.delete('/:productId', deleteProductById);

export default router;

import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '@/controllers/wishList';


import { authMiddleware } from '@/middleware/auth';

const router = express.Router();

router.get('/getWishlist', authMiddleware, getWishlist);
router.post('/addToWishlist', authMiddleware, addToWishlist);
router.delete('/:productId', authMiddleware, removeFromWishlist);

export default router;

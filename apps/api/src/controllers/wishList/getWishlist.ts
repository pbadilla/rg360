import { Request, Response } from 'express';
import { WishlistModel } from '@/models/whishList';

const getWishlist = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    const userId = req.user.id;
    const wishlist = await WishlistModel.findOne({ userId }).populate('products');
    res.json(wishlist || { products: [] });
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching wishlist', error: err.message });
  }
};

export default getWishlist;
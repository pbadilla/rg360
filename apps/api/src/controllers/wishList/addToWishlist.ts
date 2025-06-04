import { Request, Response } from 'express';
import { WishlistModel } from '@/models/whishList';
import mongoose from 'mongoose';

const addToWishlist = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || typeof (user as any)._id !== 'string') {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    const userId = (user as any)._id;
    const productId = new mongoose.Types.ObjectId(req.body.productId);

    let wishlist = await WishlistModel.findOne({ userId });

    if (!wishlist) {
      wishlist = new WishlistModel({ userId, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (err: any) {
    res.status(500).json({ message: 'Error adding to wishlist', error: err.message });
  }
};

export default addToWishlist;

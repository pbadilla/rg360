import { Request, Response } from 'express';
import { WishlistModel } from '@/models/wishList';
import mongoose from 'mongoose';

const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const productId = new mongoose.Types.ObjectId(req.params.productId);

    const wishlist = await WishlistModel.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { new: true }
    );

    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (err: any) {
    res.status(500).json({ message: 'Error removing from wishlist', error: err.message });
  }
};

export default removeFromWishlist;

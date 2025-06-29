import { Request, Response, NextFunction } from 'express';
import { AbandonedCartsModel } from '@/models/abandonedCarts';

const getAllAbandonedCarts = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const abandonedCarts = await AbandonedCartsModel.find({});
    console.log('AbandonedCarts found:', abandonedCarts);
    return res.status(200).json({ abandonedCarts });
  } catch (error: any) {
    console.error('Error fetching abandonedCarts:', error);
    return res.status(500).json({ message: error.message });
  }
};

export default getAllAbandonedCarts;

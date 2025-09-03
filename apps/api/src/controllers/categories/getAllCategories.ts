import { Request, Response, NextFunction } from 'express';
import { CategoryModel } from '@/models/category';

const getAllCategories = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const categories = await CategoryModel.find({});
    return res.status(200).json({ categories });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: error.message });
  }
};

export default getAllCategories;
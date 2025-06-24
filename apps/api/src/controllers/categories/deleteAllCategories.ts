import { Request, Response, NextFunction } from 'express';
import { CategoryModel } from '@/models/category';

const deleteAllCategories = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const result = await CategoryModel.deleteMany({});
    return res.status(200).json({ message: `Deleted ${result.deletedCount} categories.` });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default deleteAllCategories;

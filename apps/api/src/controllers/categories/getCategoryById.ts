import { Request, Response, NextFunction } from 'express';
import { CategoryModel } from '@/models/category';

const getCategoryById = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;

  try {
    const category = await CategoryModel.findOne({ id });
    if (!category) return res.status(404).json({ message: "Category not found." });

    return res.status(200).json({ category });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default getCategoryById;

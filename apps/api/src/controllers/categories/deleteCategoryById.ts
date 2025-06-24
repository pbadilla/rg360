import { Request, Response, NextFunction } from 'express';
import { CategoryModel } from '@/models/category';

const deleteCategoryById = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;

  try {
    const deleted = await CategoryModel.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ message: "Category not found." });

    return res.status(200).json({ message: "Category deleted successfully." });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default deleteCategoryById;

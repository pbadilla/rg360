import { Request, Response, NextFunction } from 'express';
import { CategoryModel } from '@/models/category';

const addCategoryById = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params; // e.g. "skates/accessories/custom-kits"
  const { name, slug, image, description } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "'name' and 'slug' are required." });
  }

  try {
    const category = await CategoryModel.findOneAndUpdate(
      { id },
      { name, slug, image, description, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    return res.status(200).json({ category });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default addCategoryById;

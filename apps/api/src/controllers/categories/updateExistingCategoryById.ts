import { Request, Response, NextFunction } from 'express';
import { CategoryModel } from '@/models/category';

const updateExistingCategoryById = async (req: Request, res: Response, _next: NextFunction) => {
  console.log('updateExistingCategoryById called', req.params, req.body);
  const id = req.params[0];
  console.log('Category ID param:', id);


  const { name, slug, image, description } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "'name' and 'slug' are required." });
  }

  try {
    const category = await CategoryModel.findOneAndUpdate(
      { id },
      { name, slug, image, description, updatedAt: new Date() },
      { new: true } // no upsert here
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    return res.status(200).json({ category });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default updateExistingCategoryById;

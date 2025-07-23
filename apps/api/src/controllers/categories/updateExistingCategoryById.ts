import { Request, Response, NextFunction } from 'express';
import { CategoryModel } from '@/models/category';

const updateExistingCategoryById = async (req: Request, res: Response, _next: NextFunction) => {
  console.log('updateExistingCategoryById called', req.params, req.body);
  
  let id: string;
  let categoryFromUrl: string | undefined;
  let subcategoryFromUrl: string | undefined;
  
  // Construir el ID y extraer category/subcategory basado en los parámetros disponibles
  if (req.params.category && req.params.subcategory && req.params.item) {
    // Caso: /category/subcategory/item
    id = `${req.params.category}/${req.params.subcategory}/${req.params.item}`;
    categoryFromUrl = req.params.category;
    subcategoryFromUrl = req.params.subcategory;
  } else if (req.params.category && req.params.subcategory) {
    // Caso: /category/subcategory
    id = `${req.params.category}/${req.params.subcategory}`;
    categoryFromUrl = req.params.category;
    subcategoryFromUrl = req.params.subcategory;
  } else if (req.params.category) {
    // Caso: /category
    id = req.params.category;
    categoryFromUrl = req.params.category;
    // subcategoryFromUrl remains undefined
  } else {
    return res.status(400).json({ message: 'Invalid category path.' });
  }
  
  console.log('Category ID constructed:', id);
  console.log('Category from URL:', categoryFromUrl);
  console.log('Subcategory from URL:', subcategoryFromUrl);

  const { name, slug, image, description } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "'name' and 'slug' are required." });
  }

  // Preparar el objeto de actualización
  const updateData: any = {
    name,
    slug,
    image,
    description,
    updatedAt: new Date()
  };

  // Agregar category y subcategory si están disponibles en la URL
  if (categoryFromUrl) {
    updateData.category = { name: categoryFromUrl }; // o el objeto completo según tu tipo 'category'
  }
  
  if (subcategoryFromUrl) {
    updateData.subcategory = { name: subcategoryFromUrl }; // o el objeto completo según tu tipo 'subcategory'
  }

  try {
    const category = await CategoryModel.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
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
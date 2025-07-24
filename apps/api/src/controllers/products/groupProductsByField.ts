import { Request, Response } from 'express';
import { ProductModel } from '@/models/product';

const groupProductsByField = async (req: Request, res: Response) => {
  try {
    const { field } = req.params;

    // Validar campo permitido (puedes personalizar)
    const allowedFields = ['category', 'brand', 'provider'];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: `Field '${field}' not allowed for grouping.` });
    }

    const grouped = await ProductModel.aggregate([
      { $group: { _id: `$${field}`, count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    return res.status(200).json({ grouped });
  } catch (error: any) {
    console.error("Error in groupBy:", error);
    return res.status(500).json({ message: error.message });
  }
};

export default groupProductsByField;

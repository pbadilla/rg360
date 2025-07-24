import { Request, Response } from 'express';
import { ProductModel } from '@/models/product';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("Fetching products with filters, pagination and sorting...");

    // 🧭 PAGINATION
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // 🔎 FILTERS
    const filter: any = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.stock) {
      filter.stock = req.query.stock === 'true';
    }
    if (req.query.brand) {
      filter.brand = req.query.brand;
    }

    // 📦 SORTING
    const sortField = req.query.sort as string || 'createdAt';
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    const sortOptions = { [sortField]: sortOrder };

    // 🚀 QUERY
    const [products, total] = await Promise.all([
      ProductModel.find(filter).sort(sortOptions).skip(skip).limit(limit).lean(),
      ProductModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      products
    });

  } catch (error: any) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: error.message, error });
  }
};

export default getAllProducts;

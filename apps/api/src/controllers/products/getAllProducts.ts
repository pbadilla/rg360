import { Request, Response } from "express";
import { ProductModel } from "@/models/product";
import { SortOrder } from "mongoose";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("Fetching products with filters, pagination and sorting...");

    // 🔎 FILTERS
    const filter: any = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.stock) filter.stock = req.query.stock === "true";
    if (req.query.brand) filter.brand = req.query.brand;

    // 📦 COUNT TOTAL FIRST
    const total = await ProductModel.countDocuments(filter);

    // 🧭 PAGINATION
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || total;
    const skip = (page - 1) * limit;

    // 📦 SORTING
    const sortField = (req.query.sort as string) || "createdAt";
    const sortOrder: SortOrder = req.query.order === "desc" ? -1 : 1;
    const sortOptions: { [key: string]: SortOrder } = {
      [sortField]: sortOrder,
    };

    // 🚀 QUERY
    const products = await ProductModel.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      products,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: error.message, error });
  }
};

export default getAllProducts;

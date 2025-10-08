import { Request, Response } from "express";
import { ProductModel } from "@/models/product";
import { SortOrder } from "mongoose";

const PLACEHOLDER_TEXTS = [
  "<p>Contacta con nosotros para mas información.</p>",
  "Contacta con nosotros para más información."
];

const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("Fetching products with filters, pagination and sorting...");

    // 🔎 FILTERS
    const filter: any = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.stock) filter.stock = req.query.stock === "true";
    if (req.query.brand) filter.brand = req.query.brand;

    // Handle missingDescription filter
    if (req.query.missingDescription === "true") {
      filter.$or = [
        { description: { $exists: false } },
        { description: null },
        { description: "" },
        { description: { $in: PLACEHOLDER_TEXTS } }
      ];
    }

    // 📦 COUNT TOTAL FIRST
    const total = await ProductModel.countDocuments(filter);

    // 🧭 PAGINATION
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || total;
    const skip = (page - 1) * limit;

    // 📦 SORTING
    let sortOptions: { [key: string]: SortOrder } = {};

    if (req.query.sort) {
      const sortFields = (req.query.sort as string).split(",");
      const sortOrders = (req.query.order as string)?.split(",") || [];

      sortFields.forEach((field, index) => {
        const order = sortOrders[index] === "desc" ? -1 : 1;
        sortOptions[field] = order;
      });
    } else {
      // Default: stock DESC, name ASC
      sortOptions = { stock: -1, name: 1 };
    }

    // 🚀 QUERY
    const products = await ProductModel.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    // Step 1: group
    const productsByBrand = products.reduce((acc: any, product) => {
      const brand = product.brand || "Unknown";
      const invalidDesc =
        !product.description ||
        product.description.trim() === "" ||
        PLACEHOLDER_TEXTS.includes(product.description.trim());

      if (!acc[brand]) {
        acc[brand] = { count: 0, missingDescCount: 0, products: [] };
      }

      acc[brand].products.push(product);
      acc[brand].count++;
      if (invalidDesc) acc[brand].missingDescCount++;

      return acc;
    }, {});

    // Step 2: turn into array & sort
    const sortedBrands = Object.entries(productsByBrand)
      .map(([brand, data]) => {
        const typedData = data as {
          count: number;
          missingDescCount: number;
          products: any[];
        };
        return {
          brand,
          count: typedData.count,
          missingDescCount: typedData.missingDescCount,
          products: typedData.products,
        };
      })
      .sort((a, b) => b.count - a.count);

    // ✅ Add global missing description count
    const globalMissingDesc = products.filter((p) => {
      return (
        !p.description ||
        p.description.trim() === "" ||
        PLACEHOLDER_TEXTS.includes(p.description.trim())
      );
    }).length;

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      missingDescriptions: globalMissingDesc,
      products,
      brands: sortedBrands,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: error.message, error });
  }
};

export default getAllProducts;

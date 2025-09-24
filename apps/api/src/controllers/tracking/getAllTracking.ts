import { Request, Response } from 'express';
import { SortOrder } from 'mongoose';

import { CarrierModel } from '@/models/carriers';

const getAllCarriers = async (req: Request, res: Response) => {
  try {
    console.log("Fetching carriers with filters, pagination and sorting...");

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
    const sortOrder: SortOrder = req.query.order === 'desc' ? -1 : 1;
    const sortOptions: Record<string, SortOrder> = { [sortField]: sortOrder };

    // 🚀 QUERY
    const [carriers, total] = await Promise.all([
      CarrierModel.find(filter).sort(sortOptions).skip(skip).limit(limit).lean(),
      CarrierModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      carriers
    });

  } catch (error: any) {
    console.error("Error fetching carriers:", error);
    return res.status(500).json({ message: error.message, error });
  }
};

export default getAllCarriers;

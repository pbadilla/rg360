import { Request, Response } from "express";
import { SortOrder } from 'mongoose';
import { RefundModel } from "@/models/payments/refund";

const getAllRefunds = async (req: Request, res: Response) => {
  try {
    console.log("Fetching payments with filters, pagination and sorting...");

    // 🧭 PAGINATION
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // 🔎 FILTERS (example: by user, status, method)
    const filter: any = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.paymentMethod) filter.paymentMethod = req.query.paymentMethod;

    // 📦 SORTING
    const sortField = (req.query.sort as string) || "createdAt";
    const sortOrder: SortOrder = req.query.order === "desc" ? -1 : 1;
    const sortOptions: Record<string, SortOrder> = { [sortField]: sortOrder };

    // 🚀 QUERY
    const [refunds, total] = await Promise.all([
      RefundModel.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      RefundModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      refunds,
    });
  } catch (error: any) {
    console.error("Error fetching refunds:", error);
    return res.status(500).json({ message: error.message, error });
  }
};


export default getAllRefunds;
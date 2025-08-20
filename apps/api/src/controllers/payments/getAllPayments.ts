import { Request, Response } from "express";
import { PaymentMethodModel } from "@/models/payments/payments";

const getAllPayments = async (req: Request, res: Response) => {
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
    const sortOrder = req.query.order === "desc" ? -1 : 1;
    const sortOptions = { [sortField]: sortOrder };

    // 🚀 QUERY
    const [payments, total] = await Promise.all([
      PaymentMethodModel.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      PaymentMethodModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      payments,
    });
  } catch (error: any) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ message: error.message, error });
  }
};


export default getAllPayments;
import { Request, Response } from "express";
import { SortOrder } from "mongoose";
import { CustomerModel } from "@/models/payments/customers";

const getAllCustomers = async (req: Request, res: Response) => {
  try {
    console.log("Fetching customers with filters, pagination and sorting...");

    // 🧭 PAGINATION
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20); // safeguard against huge requests
    const skip = (page - 1) * limit;

    // 🔎 FILTERS (match your schema)
    const filter: Record<string, any> = {};
    if (req.query.customer) filter.customer = req.query.customer;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.paymentMethod) filter.paymentMethod = req.query.paymentMethod;
    if (req.query.startDate && req.query.endDate) {
      filter.date = {
        $gte: new Date(req.query.startDate as string),
        $lte: new Date(req.query.endDate as string),
      };
    }

    // 📦 SORTING
    const sortField = (req.query.sort as string) || "createdAt";
    const sortOrder: SortOrder = req.query.order === "desc" ? -1 : 1;
    const sortOptions: Record<string, SortOrder> = { [sortField]: sortOrder };

    // 🚀 QUERY
    const [customers, total] = await Promise.all([
      CustomerModel.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      CustomerModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      customers,
    });
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({ message: "Failed to fetch customers", error: error.message });
  }
};

export default getAllCustomers;

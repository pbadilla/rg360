import { Request, Response } from 'express';
import { StockModel } from '@/models/stocks';

const getAllPOSProducts = async (_req: Request, res: Response) => {
  try {
    const page = parseInt(_req.query.page as string) || 1;
    const pageSize = parseInt(_req.query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      StockModel.find().skip(skip).limit(pageSize),
      StockModel.countDocuments()
    ]);

    res.status(200).json({
      products: items,
      total
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllPOSProducts;

import { Request, Response } from 'express';
import { StockModel } from '@/models/stocks';

const getAllStocksProducts = async (_req: Request, res: Response) => {
  try {
    const items = await StockModel.find();
    res.status(200).json({ stock: items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllStocksProducts;
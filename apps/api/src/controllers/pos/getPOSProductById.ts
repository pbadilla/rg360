import { Request, Response } from 'express';
import { StockModel } from '@/models/stocks';

const getPOSProductById = async (req: Request, res: Response) => {
  try {
    const item = await StockModel.findById(req.params.stockId);
    if (!item) return res.status(404).json({ message: 'stock item not found' });
    res.status(200).json({ stock: item });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default getPOSProductById;
import { Request, Response } from 'express';
import { StockModel } from '@/models/stocks';

const deleteAllPOSProducts = async (_req: Request, res: Response) => {
  try {
    await StockModel.deleteMany({});
    res.status(200).json({ message: 'All stock items deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default deleteAllPOSProducts;
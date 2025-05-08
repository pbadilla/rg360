import { Request, Response } from 'express';
import { InventoryModel } from '@/models/inventory';

const deleteAllInventoryProducts = async (_req: Request, res: Response) => {
  try {
    await InventoryModel.deleteMany({});
    res.status(200).json({ message: 'All inventory items deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default deleteAllInventoryProducts;
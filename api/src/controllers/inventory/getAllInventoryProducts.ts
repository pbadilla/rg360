import { Request, Response } from 'express';
import { InventoryModel } from '@/models/inventory';

const getAllInventoryProducts = async (_req: Request, res: Response) => {
  try {
    const items = await InventoryModel.find();
    res.status(200).json({ inventory: items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllInventoryProducts;
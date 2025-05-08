import { Request, Response } from 'express';
import { InventoryModel } from '@/models/inventory';

const getInventoryProductById = async (req: Request, res: Response) => {
  try {
    const item = await InventoryModel.findById(req.params.inventoryId);
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });
    res.status(200).json({ inventory: item });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default getInventoryProductById;
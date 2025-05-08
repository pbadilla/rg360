import { Request, Response } from 'express';
import { InventoryModel } from '@/models/inventory';

const deleteInventoryProductById = async (req: Request, res: Response) => {
  try {
    const result = await InventoryModel.findByIdAndDelete(req.params.inventoryId);
    if (!result) return res.status(404).json({ message: 'Inventory item not found' });
    res.status(200).json({ message: 'Inventory item deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default deleteInventoryProductById;
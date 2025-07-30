import { Request, Response } from 'express';
import { StockModel} from '@/models/stocks';

const deletePOSProductById = async (req: Request, res: Response) => {
  try {
    const result = await StockModel.findByIdAndDelete(req.params.stockId);
    if (!result) return res.status(404).json({ message: 'stock item not found' });
    res.status(200).json({ message: 'stock item deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default deletePOSProductById;
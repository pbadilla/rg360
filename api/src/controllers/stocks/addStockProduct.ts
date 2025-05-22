import { Request, Response } from 'express';
import mongoose from 'mongoose';
import QRCode from 'qrcode';
import { StockModel } from '@/models/stocks';

const addStockProduct = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      variationId,
      variantName,
      size,
      stock,
      own_stock,
      location,
      description,
      category,
      metadata
    } = req.body;

    if (!productId || stock === undefined) {
      return res.status(400).json({ message: "'productId' and 'stock' are required." });
    }
    const qrPayload = JSON.stringify({
      productId,
      variationId,
      variantName,
      size
    });

    const qrCodeImageUrl = await QRCode.toDataURL(qrPayload);

    const stockItem = new StockModel({
      _id: new mongoose.Types.ObjectId(),
      productId,
      variationId,
      variantName,
      size,
      stock,
      own_stock,
      location,
      description,
      category,
      metadata,
      qrCodeData: qrPayload,
      qrCodeImageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await stockItem.save();
    res.status(201).json({ stock: stockItem });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default addStockProduct;

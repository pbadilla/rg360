import { Request, Response } from 'express';
import mongoose from 'mongoose';
import QRCode from 'qrcode';
import { InventoryModel } from '@/models/inventory';

const addStockProduct = async (req: Request, res: Response) => {
  try {
    const { productId, variationId, size, stock, own_stock, location } = req.body;

    if (!productId || !stock) {
      return res.status(400).json({ message: "'productId' and 'stock' are required." });
    }

    const qrPayload = JSON.stringify({ productId, variationId, size });
    const qrCodeImageUrl = await QRCode.toDataURL(qrPayload);

    const inventoryItem = new InventoryModel({
      _id: new mongoose.Types.ObjectId(),
      productId,
      variationId,
      size,
      stock,
      own_stock,
      location,
      qrCodeData: qrPayload,
      qrCodeImageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await inventoryItem.save();
    res.status(201).json({ inventory: inventoryItem });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default addStockProduct;
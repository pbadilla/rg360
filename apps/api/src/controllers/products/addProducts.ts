import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ProductModel, ProductDocument } from '@/models/product';

const addProduct = (req: Request, res: Response, _next: NextFunction) => {
    const {
        SKU, brand, category, description, ean13, images, name,
        price, rating, reference, status, stock, tags, variations, vendorId
    } = req.body;

    if (!ean13 || !name || !reference || !status || !rating) {
        return res.status(400).json({
            message: "Fields 'ean13', 'name', 'reference', 'status', and 'rating' are required."
        });
    }

    const product = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        SKU, brand, category, description, ean13, images, name,
        price, rating, reference, status, stock, tags, variations, vendorId,
        UpdateData: new Date(),
        createdAt: new Date()
    });

    return product.save()
        .then((result: ProductDocument) => res.status(201).json({ product: result }))
        .catch((error: Error) => res.status(500).json({ message: error.message, error }));
};

export default addProduct;

import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { OrderModel } from '@/models/order';

const addOrder = (req: Request, res: Response, _next: NextFunction) => {
    const {
        SKU, brand, category, description, ean13, images, name,
        price, rating, reference, status, stock, tags, variations, vendorId
    } = req.body;

    if (!ean13 || !name || !reference || !status || !rating) {
        return res.status(400).json({
            message: "Fields 'ean13', 'name', 'reference', 'status', and 'rating' are required."
        });
    }

    const product = new OrderModel({
        _id: new mongoose.Types.ObjectId(),
        SKU, brand, category, description, ean13, images, name,
        price, rating, reference, status, stock, tags, variations, vendorId,
        UpdateData: new Date(),
        createdAt: new Date()
    });

    return product.save()
        .then((result) => res.status(201).json({ product: result }))
        .catch((error) => res.status(500).json({ message: error.message, error }));
};

export default addOrder;

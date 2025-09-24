import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { PromotionsModel, PromotionsDocument } from '@/models/sales';

const addSales = (req: Request, res: Response, _next: NextFunction) => {
    const {
        SKU, brand, category, description, ean13, images, name,
        price, rating, reference, status, stock, tags, variations, vendorId
    } = req.body;

    if (!ean13 || !name || !reference || !status || !rating) {
        return res.status(400).json({
            message: "Fields 'ean13', 'name', 'reference', 'status', and 'rating' are required."
        });
    }

    const sales = new PromotionsModel({
        _id: new mongoose.Types.ObjectId(),
        title: name,
        description,
        status,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return sales.save()
        .then((result: PromotionsDocument) => res.status(201).json({ promotions: result }))
        .catch((error: Error) => res.status(500).json({ message: error.message, error }));
};

export default addSales;

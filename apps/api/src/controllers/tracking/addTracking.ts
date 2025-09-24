import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { PromotionsModel, PromotionsDocument } from '@/models/tracking';

const addTracking = (req: Request, res: Response, _next: NextFunction) => {
    const { title, description, status } = req.body;

    if (!title || !status) {
        return res.status(400).json({
            message: "Fields 'title' and 'status' are required."
        });
    }

    const tracking = new PromotionsModel({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        status,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return tracking.save()
        .then((result: PromotionsDocument) => res.status(201).json({ promotions: result }))
        .catch((error: Error) => res.status(500).json({ message: error.message, error }));
};

export default addTracking;

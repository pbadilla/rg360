import { Request, Response, NextFunction } from 'express';
import { PromotionsModel, PromotionsDocument } from '@/models/sales';

const getSalesById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { salesId } = req.params;
        console.log(`Fetching sales by ID: ${salesId}`);

        const sales = await PromotionsModel.findById(salesId).lean() as PromotionsDocument | null;

        if (!sales) {
            console.log('Sales not found.');
            return res.status(404).json({ message: 'Sales not found.' });
        }

        console.log('Sales found:', sales.title || sales._id);
        return res.status(200).json({ sales });
    } catch (error: any) {
        console.error('Error fetching sales by ID:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default getSalesById;

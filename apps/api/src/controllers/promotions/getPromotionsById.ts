import { Request, Response, NextFunction } from 'express';
import { PromotionsModel, PromotionsDocument } from '@/models/promotions';

const getPromotionsById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { promotionsId } = req.params;
        console.log(`Fetching promotions by ID: ${promotionsId}`);

        const promotions = await PromotionsModel.findById(promotionsId).lean() as PromotionsDocument | null;

        if (!promotions) {
            console.log('Promotions not found.');
            return res.status(404).json({ message: 'Promotions not found.' });
        }

        console.log('Promotions found:', promotions.title || promotions._id);
        return res.status(200).json({ promotions });
    } catch (error: any) {
        console.error('Error fetching promotions by ID:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default getPromotionsById;

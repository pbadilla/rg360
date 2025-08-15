import { Request, Response, NextFunction } from 'express';
import { PromotionsModel } from '@/models/promotions';

const deleteAllPromotions = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        console.log('Deleting all promotions from the database...');

        const result = await PromotionsModel.deleteMany({}).lean();
        console.log(`${result.deletedCount} promotions deleted.`);

        return res.status(200).json({
            message: `${result.deletedCount} promotions deleted successfully.`
        });
    } catch (error: any) {
        console.error('Error deleting all promotions:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default deleteAllPromotions;

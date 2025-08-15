import { Request, Response, NextFunction } from 'express';
import { PromotionsModel } from '@/models/promotions';

const deletePromotionsById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { promotionsId } = req.params;
        console.log(`Deleting promotions with ID: ${promotionsId}`);

        const result = await PromotionsModel.findByIdAndDelete(promotionsId).lean();

        if (!result) {
            console.log('Promotions not found.');
            return res.status(404).json({ message: 'Promotions not found.' });
        }

        console.log('Promotions deleted successfully.');
        return res.status(200).json({ message: 'Promotions deleted successfully.' });
    } catch (error: any) {
        console.error('Error deleting promotions by ID:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default deletePromotionsById;

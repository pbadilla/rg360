import { Request, Response, NextFunction } from 'express';
import { AbandonedCartsModel } from '@/models/abandonedCarts';

const deleteAllAbandonedCarts = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        console.log('Deleting all abandoned from the database...');

        const result = await AbandonedCartsModel.deleteMany({}).lean();
        console.log(`${result.deletedCount} abandonedCarts deleted.`);

        return res.status(200).json({
            message: `${result.deletedCount} abandonedCarts deleted successfully.`
        });
    } catch (error: any) {
        console.error('Error deleting all abandonedCarts:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default deleteAllAbandonedCarts;

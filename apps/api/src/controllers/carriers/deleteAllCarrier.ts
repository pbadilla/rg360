import { Request, Response, NextFunction } from 'express';
import { CarrierModel } from '@/models/carriers';

const deleteAllCarrier = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        console.log('Deleting all carriers from the database...');

        const result = await CarrierModel.deleteMany({}).lean();
        console.log(`${result.deletedCount} carriers deleted.`);

        return res.status(200).json({
            message: `${result.deletedCount} carriers deleted successfully.`
        });
    } catch (error: any) {
        console.error('Error deleting all carriers:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default deleteAllCarrier;

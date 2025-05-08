import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '@/models/order';

const deleteAllOrders = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        console.log('Deleting all orders from the database...');

        const result = await OrderModel.deleteMany({}).lean();
        console.log(`${result.deletedCount} orders deleted.`);

        return res.status(200).json({
            message: `${result.deletedCount} orders deleted successfully.`
        });
    } catch (error: any) {
        console.error('Error deleting all orders:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default deleteAllOrders;

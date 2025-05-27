import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '@/models/product';

const deleteAllProducts = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        console.log('Deleting all products from the database...');

        const result = await ProductModel.deleteMany({}).lean();
        console.log(`${result.deletedCount} products deleted.`);

        return res.status(200).json({
            message: `${result.deletedCount} products deleted successfully.`
        });
    } catch (error: any) {
        console.error('Error deleting all products:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default deleteAllProducts;

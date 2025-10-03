import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '@/models/product';

const resetFieldForAllProducts = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { fieldName } = req.params;

        // This will set the field to empty string ("") for all products
        const update = { $set: { [fieldName]: "" } };
        // If you prefer removing the field completely, use:
        // const update = { $unset: { [fieldName]: "" } };

        console.log(`Resetting field "${fieldName}" for ALL products...`);

        const result = await ProductModel.updateMany({}, update);

        console.log(`Field "${fieldName}" reset for ${result.modifiedCount} products.`);
        return res.status(200).json({
            message: `Field "${fieldName}" reset for ${result.modifiedCount} products.`,
            modifiedCount: result.modifiedCount
        });
    } catch (error: any) {
        console.error('Error resetting field for all products:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default resetFieldForAllProducts;

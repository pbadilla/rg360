import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '@/models/product';

const resetProductField = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { productId, fieldName } = req.params;

        // Decide whether you want to unset or reset to null
        const update = { $unset: { [fieldName]: "" } };
        // alternatively:
        // const update = { $set: { [fieldName]: null } };

        console.log(`Resetting field "${fieldName}" for product with ID: ${productId}`);

        const result = await ProductModel.findByIdAndUpdate(
            productId,
            update,
            { new: true } // return the updated document
        ).lean();

        if (!result) {
            console.log('Product not found.');
            return res.status(404).json({ message: 'Product not found.' });
        }

        console.log(`Field "${fieldName}" reset successfully.`);
        return res.status(200).json({ 
            message: `Field "${fieldName}" reset successfully.`,
            product: result
        });
    } catch (error: any) {
        console.error('Error resetting product field:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default resetProductField;

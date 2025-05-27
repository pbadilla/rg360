import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '@/models/product';

const deleteProductById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { productId } = req.params;
        console.log(`Deleting product with ID: ${productId}`);

        const result = await ProductModel.findByIdAndDelete(productId).lean();

        if (!result) {
            console.log('Product not found.');
            return res.status(404).json({ message: 'Product not found.' });
        }

        console.log('Product deleted successfully.');
        return res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error: any) {
        console.error('Error deleting product by ID:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default deleteProductById;

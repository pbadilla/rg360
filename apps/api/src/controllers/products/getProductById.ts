import { Request, Response, NextFunction } from 'express';
import { ProductModel, ProductDocument } from '@/models/product';

const getProductById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { productId } = req.params;
        console.log(`Fetching product by ID: ${productId}`);

        const product = await ProductModel.findById(productId).lean() as ProductDocument | null;

        if (!product) {
            console.log('Product not found.');
            return res.status(404).json({ message: 'Product not found.' });
        }

        console.log('Product found:', product.name || product._id);
        return res.status(200).json({ product });
    } catch (error: any) {
        console.error('Error fetching product by ID:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default getProductById;

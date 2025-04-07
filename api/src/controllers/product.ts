import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '@/models/Product';

// Add a new product
const addProduct = (req: Request, res: Response, _next: NextFunction) => {
    const {
        SKU,
        brand,
        category,
        description,
        ean13,
        images,
        name,
        price,
        rating,
        reference,
        status,
        stock,
        tags,
        variations,
        vendorId,
    } = req.body;

    // Validate required fields
    if (!ean13 || !name || !reference || !status || !rating) {
        return res.status(400).json({
            message: "Fields 'ean13', 'name', 'reference', 'status', and 'rating' are required."
        });
    }

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        SKU,
        brand,
        category,
        description,
        ean13,
        images,
        name,
        price,
        rating,
        reference,
        status,
        stock,
        tags,
        variations,
        vendorId,
        UpdateData: new Date(),
        createdAt: new Date()
    });

    // Save the product to the database
    return product
        .save()
        .then((result) => {
            return res.status(201).json({
                product: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

// Get all products
const getAllProducts = (_req: Request, res: Response, _next: NextFunction) => {
    Product.find()
        .exec()
        .then((products) => {
            return res.status(200).json({
                products: products,
                count: products.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

// Get a product by ID
const getProductById = (req: Request, res: Response, _next: NextFunction) => {
    const { productId } = req.params;

    Product.findById(productId)
        .exec()
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found."
                });
            }
            return res.status(200).json({
                product
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

// Delete all products
const deleteAllProducts = (_req: Request, res: Response, _next: NextFunction) => {
    Product.deleteMany({})
        .exec()
        .then((result) => {
            return res.status(200).json({
                message: `${result.deletedCount} products deleted successfully.`
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

// Delete a product by ID
const deleteProductById = (req: Request, res: Response, _next: NextFunction) => {
    const { productId } = req.params;

    Product.findByIdAndDelete(productId)
        .exec()
        .then((result) => {
            if (!result) {
                return res.status(404).json({
                    message: "Product not found."
                });
            }
            return res.status(200).json({
                message: "Product deleted successfully."
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { addProduct, getAllProducts, getProductById, deleteAllProducts, deleteProductById };

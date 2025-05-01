import { Request, Response } from 'express';
import { ProductModel } from '@/models/product';

const getAllProducts = async (_req: Request, res: Response) => {
  try {
      // Log the start of the query
      console.log("Fetching all products from the database...");

      // Query the database for all products
      const products = await ProductModel.find().lean();

      // Log how many products were found
      console.log(`Found ${products.length} products.`);

      // If no products found, return an empty response with a message
      if (products.length === 0) {
          return res.status(200).json({
              message: "No products found.",
              count: 0,
              products: []
          });
      }

      // Send back the products and the count
      return res.status(200).json({
          products,
          count: products.length
      });
  } catch (error: any) {
      // Log the error for debugging purposes
      console.error("Error fetching products:", error);

      // Return an error response if something went wrong
      return res.status(500).json({
          message: error.message,
          error
      });
  }
};

export default getAllProducts;


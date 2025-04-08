import { Router, Request, Response } from 'express';
import productController from '@/controllers/product';
import { generateDescription } from "@/services/aiDescription";
import { Product } from "@/types/product";

const router = Router();


router.post("/product", async (req: Request, res: Response) => {
  try {
    const product: Product = {
      ...req.body,
      createdAt: new Date(),
    };

    const description = await generateDescription(product);

    res.json({ ...product, description });
  } catch (error: any) {
    console.error("Error generating description:", error.message);
    res.status(500).json({ error: "Failed to generate product description" });
  }
});

// Route to add a new product
router.post('/products', productController.addProduct);

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to get a product by ID
router.get('/products/:productId', productController.getProductById);

// Route to delete all products
router.delete('/products', productController.deleteAllProducts);

// Route to delete a product by ID
router.delete('/products/:productId', productController.deleteProductById);

export default router;
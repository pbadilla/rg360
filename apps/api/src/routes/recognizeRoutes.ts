import { Router, Request, Response } from "express";
import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";
import mongoose from "mongoose";
import FormData from "form-data";

// Import the correct ProductModel export
import { ProductModel } from "@/models/product"; 

const router = Router();
const upload = multer({ dest: "uploads/" });

/** Middleware to check DB connection */
router.use((req: Request, res: Response, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Service Unavailable. Database not connected." });
  }
  next();
});

/** Recognize product by image */
router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No image uploaded" });
        return;
      }

      // Send image to ML service
      const formData = new FormData();
      formData.append("image", fs.createReadStream(req.file.path));

      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        body: formData as any,
        headers: formData.getHeaders(),
      });

      if (!response.ok) {
        res.status(500).json({ message: "Error from ML service" });
        return;
      }

      const data = (await response.json()) as {
        ids: number[][];
        distances: number[][];
      };

      // Example response: { ids: [[12, 53, 44]], distances: [[0.11, 0.24, 0.33]] }
      const productIds = data.ids[0];

      // Lookup products in MongoDB using ProductModel
      const products = await ProductModel.find({
        _id: { $in: productIds },
      });

      res.json({ matches: products, scores: data.distances[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error recognizing product" });
    }
  }
);

export default router;
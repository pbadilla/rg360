import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ProductModel } from '@/models/product'; // Asume que tienes este modelo

const updateProductById = async (req: Request, res: Response, _next: NextFunction) => {
  console.log('updateProductById called', req.params, req.body);
  
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ message: 'Product ID is required.' });
  }
  
  console.log('Product ID:', id);

  const {
    name,
    description,
    price,
    category,
    vendorId,
    stock,
    images,
    SKU,
    rating,
    reference,
    status,
    tags,
    variations
  } = req.body;

  // Validaciones básicas
  if (name && typeof name !== 'string') {
    return res.status(400).json({ message: 'Name must be a string.' });
  }

  if (price && (!price.pvp || !price.pv)) {
    return res.status(400).json({ message: 'Price must include pvp and pv values.' });
  }

  if (category && (!category.name || !category.color)) {
    return res.status(400).json({ message: 'Category must include name and color.' });
  }

  if (stock && (typeof stock !== 'number' || stock < 0)) {
    return res.status(400).json({ message: 'Stock must be a positive number.' });
  }

  // Construir objeto de actualización (solo campos que se envían)
  const updateData: any = {
    UpdateData: new Date()
  };

  // Solo agregar campos si están presentes en el body
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (price !== undefined) {
    // Calcular benefit_percentage si se proporcionan pvp y pv
    if (price.pvp && price.pv) {
      price.benefit_percentage = Number(((price.pvp - price.pv) / price.pv * 100).toFixed(1));
    }
    updateData.price = price;
  }
  if (category !== undefined) updateData.category = category;
  if (vendorId !== undefined) updateData.vendorId = vendorId;
  if (stock !== undefined) updateData.stock = stock;
  if (images !== undefined) updateData.images = images;
  if (SKU !== undefined) updateData.SKU = SKU;
  if (rating !== undefined) updateData.rating = rating;
  if (reference !== undefined) updateData.reference = reference;
  if (status !== undefined) updateData.status = status;
  if (tags !== undefined) updateData.tags = tags;
  if (variations !== undefined) {
    // Calcular benefit_percentage para cada variación si es necesario
    const processedVariations = variations.map((variation: any) => ({
      ...variation,
      sizes: variation.sizes?.map((size: any) => ({
        ...size,
        price: size.price && size.price.pvp && size.price.pv ? {
          ...size.price,
          benefit_percentage: Number(((size.price.pvp - size.price.pv) / size.price.pv * 100).toFixed(1))
        } : size.price
      }))
    }));
    updateData.variations = processedVariations;
  }

  try {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, // Devolver el documento actualizado
        runValidators: true // Ejecutar validaciones del esquema
      }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json({ 
      message: 'Product updated successfully',
      product 
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
    
    // Manejar errores específicos
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        details: error.message 
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid product ID format.' 
      });
    }

    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

export default updateProductById;
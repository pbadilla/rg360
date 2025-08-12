import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { number } from "framer-motion";
import { Category } from "@/types/category";

interface ProductEditDialogProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  isLoading?: boolean;
}

const DEFAULT_PRODUCT: Product = {
  id: "",
  name: "",
  description: "",
  reference: "",
  brand: "",
  colors: [],
  sizes: [],
  price: {
    pvp: 0,
    pv: 0,
    benefit_percentage: 0,
  },
  category: {
    name: "default",
    color: "#cccccc",
  },
  images: [
    {
      url: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  stock: 0,
  tags: [],
  createdAt: "",
  status: "active", // or your default value
  rating: 0,
  ean13: "",
  updateData: new Date(),
  variations: [],
};

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Product>(product || DEFAULT_PRODUCT);
  const isNewProduct = !product?.id;

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(DEFAULT_PRODUCT);
    }
  }, [product, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] animate-fade-in">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {isNewProduct ? "Add New Product" : "Edit Product"}
            </DialogTitle>
            <DialogDescription>
              {isNewProduct
                ? "Create a new product by filling out the form below."
                : "Make changes to the product details."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
                className="min-h-[100px] transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price.pvp}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: {
                        ...prev.price,
                        pvp: parseFloat(e.target.value) || 0,
                      },
                    }))
                  }
                  placeholder="0.00"
                  required
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: {
                      ...prev.category,
                      name: e.target.value,
                    },
                  }))
                }
                placeholder="Enter product category"
                required
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.images[0]?.url || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    images: [{ url: e.target.value }, ...prev.images.slice(1)],
                  }))
                }
                placeholder="https://example.com/image.jpg"
                required
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditDialog;

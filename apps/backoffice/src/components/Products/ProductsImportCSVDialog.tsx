import type React from "react";
import { useEffect, useState } from "react";

import { number } from "framer-motion";

import { CSVImport } from "@/components/csv/csv-import";
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

import { Category } from "@/types/category";
import type { Product } from "@/types/product";


interface ProductsImportCSVDialogProps {
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

const ProductsImportCSVDialog: React.FC<ProductsImportCSVDialogProps> = ({
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // For stock, parse as number; for others just use string
    if (name === "stock") {
      setFormData((prev) => ({
        ...prev,
        stock: parseInt(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
            <CSVImport />
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

export default ProductsImportCSVDialog;

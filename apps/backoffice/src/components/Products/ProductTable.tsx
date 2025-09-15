import type React from "react";

import { Pen, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Product } from "@/types/product";

import { formatPrice } from "@/utils/productUtils";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  isEditing?: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="h-12 w-12 rounded overflow-hidden bg-white">
                  <img
                    src={
                      Array.isArray(product.images) && product.images.length > 0
                        ? typeof product.images[0] === "string"
                          ? product.images[0]
                          : product.images[0]?.url || ""
                        : ""
                    }
                    alt={
                      typeof product.name === "string"
                        ? product.name
                        : (product.name && "en" in product.name) ||
                          (product.name && "default" in product.name) ||
                          "Unknown"
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div>
                <div className="font-medium">
                  {typeof product.name === "string"
                    ? product.name
                    : "Unknown"}
                </div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {product.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {typeof product.category === "string"
                    ? product.category
                    : (product.category && "name" in product.category)
                      ? product.category.name
                      : "Unknown"}
                </Badge>
              </TableCell>
              <TableCell>
                {typeof product.price === "number"
                  ? formatPrice(product.price)
                  : typeof product.price === "object" && product.price !== null && "amount" in product.price && typeof (product.price as { amount?: unknown }).amount === "number"
                    ? formatPrice((product.price as { amount: number }).amount)
                    : "N/A"}
              </TableCell>
              <TableCell>
                <Badge variant={product.stock > 10 ? "outline" : "destructive"}>
                  {product.stock}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(product)}
                  >
                    <Pen className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(product.id)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
